"use client";

import { useState } from "react";
import axios from "axios";

const currencies = [
  "USD", "EUR", "GBP", "AUD", "CAD", "CHF", "JPY", "CNY", "TRY",
  "RUB", "INR", "BRL", "ZAR", "SEK", "NOK", "DKK", "MXN", "PLN",
  "NZD", "SGD", "HKD", "HUF"
];

export default function Home() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const convert = async () => {
    setLoading(true);
    setResult("");

    try {
      // Your backend URL:
      const res = await axios.post("http://localhost:5000/convert", {
        from,
        to,
        amount
      });

      setResult(res.data.message);
    } catch (err) {
      setResult("Error converting currency.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h1 className="text-white text-3xl font-bold text-center mb-6">
          Currency Converter
        </h1>

        <div className="space-y-4">

          {/* Amount Input */}
          <div>
            <label className="text-gray-300 text-sm">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-gray-700 text-white outline-none"
            />
          </div>

          {/* From Currency */}
          <div>
            <label className="text-gray-300 text-sm">From</label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-gray-700 text-white outline-none"
            >
              {currencies.map((cur) => (
                <option key={cur}>{cur}</option>
              ))}
            </select>
          </div>

          {/* To Currency */}
          <div>
            <label className="text-gray-300 text-sm">To</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-gray-700 text-white outline-none"
            >
              {currencies.map((cur) => (
                <option key={cur}>{cur}</option>
              ))}
            </select>
          </div>

          {/* Convert Button */}
          <button
            onClick={convert}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg mt-3 font-semibold"
          >
            {loading ? "Converting..." : "Convert"}
          </button>

          {/* Result */}
          {result && (
            <div className="mt-4 p-4 bg-gray-700 text-white rounded-lg">
              {result}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
