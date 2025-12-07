
export async function convertCurrency(amount: number, from: string, to: string) {
  try {
    const url = `http://127.0.0.1:5000/convert?amount=${amount}&from_currency=${from}&to_currency=${to}`;
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Backend error");
    }

    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    return null;
  }
}
