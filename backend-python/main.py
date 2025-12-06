from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()

# Allow your Next.js frontend to call the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # set specific domain when deploying
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

EXCHANGE_API = "https://open.er-api.com/v6/latest/"
COUNTRIES_API = "https://restcountries.com/v3.1/currency/"


# ---------------------------
#  Convert Currency
# ---------------------------
@app.get("/convert")
async def convert_currency(from_currency: str, to_currency: str, amount: float):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(EXCHANGE_API + from_currency.upper())
            data = response.json()

        if data["result"] != "success":
            raise HTTPException(status_code=400, detail="Invalid base currency")

        rate = data["rates"].get(to_currency.upper())

        if rate is None:
            raise HTTPException(status_code=400, detail="Invalid target currency")

        converted = amount * rate

        return {
            "from": from_currency.upper(),
            "to": to_currency.upper(),
            "rate": rate,
            "amount": amount,
            "converted": round(converted, 2)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ---------------------------
#  Get Countries Using Currency
# ---------------------------
@app.get("/countries/{currency}")
async def get_countries(currency: str):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(COUNTRIES_API + currency.upper())
            data = response.json()

        if isinstance(data, dict) and data.get("status") == 404:
            raise HTTPException(status_code=404, detail="Currency not found")

        countries = [c["name"]["common"] for c in data]

        return {"currency": currency.upper(), "countries": countries}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
