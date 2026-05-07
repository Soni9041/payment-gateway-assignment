
"use client";

import { usePayment } from "../hooks/usePayment";
import { usePaymentStore } from "../store/paymentStore";

export default function StatusScreen() {
  const {
    status,
    attempts,
    currentTxId,
    setStatus,
  } = usePaymentStore();

  const { makePayment } = usePayment();

  const handleRetry = () => {
    if (!currentTxId) return;

    makePayment({
      transactionId: currentTxId,
      cardName: "Retry User",
      cardNumber: "4242 4242 4242 4242",
      expiry: "12/30",
      cvv: "123",
      amount: 100,
      currency: "INR",
    });
  };

  const reset = () => setStatus("IDLE");

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md text-center">
      {status === "PROCESSING" && (
        <div>
          <p className="text-lg font-semibold">Processing Payment...</p>
          <div className="mt-4 animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
        </div>
      )}

      {status === "SUCCESS" && (
        <div>
          <p className="text-green-600 text-xl font-bold">
            Payment Successful 🎉
          </p>
          <button
            onClick={reset}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            New Payment
          </button>
        </div>
      )}

      {(status === "FAILED" || status === "TIMEOUT") && (
        <div>
          <p className="text-red-500 text-lg font-semibold">
            {status === "FAILED"
              ? "Payment Failed"
              : "Request Timed Out"}
          </p>

          <p className="text-sm mt-2">
            Attempt {attempts} of 3
          </p>

          {attempts < 3 ? (
            <button
              onClick={handleRetry}
              className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg"
            >
              Retry
            </button>
          ) : (
            <p className="mt-4 text-red-600">
              Max attempts reached
            </p>
          )}

          <button
            onClick={reset}
            className="block mt-4 text-blue-600 underline"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}