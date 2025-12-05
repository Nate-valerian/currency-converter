import axios from "axios";

const API_URL = "https://api.exchangerate.host/latest";

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(`https://open.er-api.com/v6/latest/${from}`);

    const rate = response.data.rates[to];

    if (!rate) throw new Error();

    return rate;
  } catch {
    throw new Error(`Unable to get exchange rate for ${from} → ${to}`);
  }
};


const getCountries = async (currency) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/currency/${currency}`
    );

    return response.data.map((country) => country.name.common);
  } catch {
    throw new Error(`Unable to get countries using "${currency}"`);
  }
};

const convertCurrency = async (from, to, amount) => {
  const [rate, countries] = await Promise.all([
    getExchangeRate(from, to),
    getCountries(to),
  ]);

  const converted = (amount * rate).toFixed(2);

  return `${amount} ${from} = ${converted} ${to}. Spendable in: ${countries.join(", ")}`;
};

// Example: convert USD → EUR
convertCurrency("USD", "EUR", 20)
  .then(console.log)
  .catch((err) => console.log(err.message));


