"use client";

import { usePaymentStore } from "../store/paymentStore";

export default function TransactionHistory() {
  const { transactions } = usePaymentStore();

  console.log("transactions....",transactions)

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md h-full">
      <h2 className="font-semibold mb-3">Transactions</h2>

      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {transactions.length === 0 && (
          <p className="text-sm text-gray-500">
            No transactions yet
          </p>
        )}

        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="border p-3 rounded-lg text-sm"
          >
            {/* <p className="font-medium">{tx.id}</p> */}
            <p>
              ₹{tx.amount} • {tx.status}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(tx.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}