"use client";

import { useState } from "react";



export default function Home() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [result, setResult] = useState("");

  const convert = async () => {
    if (!amount) return;

    try {
      const res = await fetch(`/api/convert?amount=${amount}&from=${from}&to=${to}`);
      const data = await res.json();
      setResult(data.result || data.error);

    } catch (err) {
      console.error(err);
      setResult("Error connecting to backend");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-5">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Currency Calculator
        </h1>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="w-full p-3 border rounded-xl"
        />

        <div className="flex gap-4">
          <select
            value={from}
            onChange={e => setFrom(e.target.value)}
            className="flex-1 p-3 border rounded-xl"
          >
            <option>USD</option>
            <option>EUR</option>
            <option>TRY</option>
            <option>GBP</option>
          </select>

          <select
            value={to}
            onChange={e => setTo(e.target.value)}
            className="flex-1 p-3 border rounded-xl"
          >
            <option>USD</option>
            <option>EUR</option>
            <option>TRY</option>
            <option>GBP</option>
          </select>
        </div>

        <button
          onClick={convert}
          className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Convert
        </button>

        {result && (
          <div className="text-center text-xl font-bold text-green-600">
            {result}
          </div>
        )}
      </div>
    </main>
  );
}
