"use client";

import { useState, useMemo } from "react";
import { usePayment } from "../hooks/usePayment";
import { usePaymentStore } from "../store/paymentStore";
import { detectCardType } from "../utils/cardutils";
import { validateCVV, validateExpiry } from "../utils/validators";
import { formatCardNumber } from "../utils/formatter";


export default function PaymentForm() {
  const { makePayment } = usePayment();
  const { setTxId, resetAttempts } = usePaymentStore();

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  const [touched, setTouched] = useState<any>({});

  // Detect card type
  const cardType = useMemo(
    () => detectCardType(cardNumber.replace(/\s/g, "")),
    [cardNumber]
  );

  // Validation
  const errors = {
    cardName: cardName.trim().length < 3 ? "Enter valid name" : "",
    cardNumber:
      cardNumber.replace(/\s/g, "").length < 16
        ? "Invalid card number"
        : "",
    expiry: !validateExpiry(expiry) ? "Invalid expiry" : "",
    cvv: !validateCVV(cvv, cardType) ? "Invalid CVV" : "",
    amount: Number(amount) <= 0 ? "Enter valid amount" : "",
  };

  const isValid = Object.values(errors).every((e) => e === "");

  // Handlers
  const handleCardNumber = (e: any) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiry = (e: any) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }

    setExpiry(value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!isValid) return;

    const txId = crypto.randomUUID();

    setTxId(txId);
    resetAttempts();

    await makePayment({
      transactionId: txId,
      cardName,
      cardNumber,
      expiry,
      cvv,
      amount: Number(amount),
      currency ,
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Payment Details</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Card Name */}
        <div>
          <label className="block text-sm font-medium">
            Cardholder Name
          </label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            onBlur={() => setTouched({ ...touched, cardName: true })}
            className="w-full border rounded-lg p-2 mt-1"
          />
          {touched.cardName && errors.cardName && (
            <p className="text-red-500 text-sm">{errors.cardName}</p>
          )}
        </div>

        {/* Card Number */}
        <div>
          <label className="block text-sm font-medium">
            Card Number
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumber}
              onBlur={() => setTouched({ ...touched, cardNumber: true })}
              maxLength={19}
              className="w-full border rounded-lg p-2 mt-1"
            />
            <span className="text-sm font-semibold">{cardType}</span>
          </div>
          {touched.cardNumber && errors.cardNumber && (
            <p className="text-red-500 text-sm">
              {errors.cardNumber}
            </p>
          )}
        </div>

        {/* Expiry + CVV */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium">
              Expiry (MM/YY)
            </label>
            <input
              type="text"
              value={expiry}
              onChange={handleExpiry}
              onBlur={() => setTouched({ ...touched, expiry: true })}
              maxLength={5}
              className="w-full border rounded-lg p-2 mt-1"
            />
            {touched.expiry && errors.expiry && (
              <p className="text-red-500 text-sm">
                {errors.expiry}
              </p>
            )}
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium">CVV</label>
            <input
              type="password"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              onBlur={() => setTouched({ ...touched, cvv: true })}
              maxLength={cardType === "AMEX" ? 4 : 3}
              className="w-full border rounded-lg p-2 mt-1"
            />
            {touched.cvv && errors.cvv && (
              <p className="text-red-500 text-sm">{errors.cvv}</p>
            )}
          </div>
        </div>

        {/* Amount + Currency */}
        <div className="flex gap-2">
          <div className="w-2/3">
            <label className="block text-sm font-medium">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onBlur={() => setTouched({ ...touched, amount: true })}
              className="w-full border rounded-lg p-2 mt-1"
            />
            {touched.amount && errors.amount && (
              <p className="text-red-500 text-sm">
                {errors.amount}
              </p>
            )}
          </div>

          <div className="w-1/3">
            <label className="block text-sm font-medium">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as "INR" | "USD")}
              className="w-full border rounded-lg p-2 mt-1"
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-2 rounded-lg text-white font-semibold ${
            isValid
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
}