import axios from "axios";

export async function POST(req) {
  try {
    const { fromCurrency, toCurrency, amount } = await req.json();

    // Exchange rate
    const rateRes = await axios.get(
      "https://api.exchangerate.host/latest?base=EUR"
    );

    const rate = rateRes.data.rates;
    const euro = 1 / rate[fromCurrency];
    const exchangeRate = euro * rate[toCurrency];

    // Countries
    const countryRes = await axios.get(
      `https://restcountries.com/v3.1/currency/${toCurrency}`
    );

    const countries = countryRes.data.map(c => c.name.common);

    const convertedAmount = (amount * exchangeRate).toFixed(2);

    return Response.json({
      result: `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`,
      countries,
    });
  } catch (error) {
    return Response.json(
      { error: "Conversion failed" },
      { status: 500 }
    );
  }
}
