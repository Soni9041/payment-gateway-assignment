"use client";

import { useEffect } from "react";
import PaymentForm from "./components/PaymentForm";
import StatusScreen from "./components/StatusScreen";
import TransactionHistory from "./components/TransactionHistory";
import { usePaymentStore } from "./store/paymentStore";

export default function Home() {
  const { status, loadFromStorage } = usePaymentStore();

  useEffect(() => {
    loadFromStorage();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-4 flex flex-col lg:flex-row gap-6">
      <div className="flex-1">
        {status === "IDLE" && <PaymentForm />}
        {status !== "IDLE" && <StatusScreen />}
      </div>

      <div className="w-full lg:w-[400px]">
        <TransactionHistory />
      </div>
    </main>
  );
}