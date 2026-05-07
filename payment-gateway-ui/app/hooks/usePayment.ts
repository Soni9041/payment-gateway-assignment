import { PaymentPayload } from "../payment/payment";
import { usePaymentStore } from "../store/paymentStore";

export const usePayment = () => {
  const {
    setStatus,
    addTransaction,
    attempts,
    incrementAttempt,
    currentTxId,
  } = usePaymentStore();

  const makePayment = async (payload: PaymentPayload) => {
    setStatus("PROCESSING");
    incrementAttempt();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    try {
      const res = await fetch("/api/pay", {
        method: "POST",
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const data = await res.json();

      if (data.status === "SUCCESS") {
        setStatus("SUCCESS");
        addTransaction({
          id: payload.transactionId,
          amount: payload.amount,
          status: "SUCCESS",
          timestamp: new Date().toISOString(),
          attempts,
        });
      } else {
        setStatus("FAILED");
      }
    } catch (err) {
      setStatus("TIMEOUT");
    }
  };

  return { makePayment };
};


