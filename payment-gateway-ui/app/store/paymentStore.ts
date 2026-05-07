

import { create } from "zustand";
import { PaymentStatus, Transaction } from "../payment/payment";

interface PaymentState {
  status: PaymentStatus;
  transactions: Transaction[];
  attempts: number;
  currentTxId: string | null;

  setStatus: (status: PaymentStatus) => void;
  addTransaction: (tx: Transaction) => void;
  incrementAttempt: () => void;
  resetAttempts: () => void;
  setTxId: (id: string) => void;
  loadFromStorage: () => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  status: "IDLE",
  transactions: [],
  attempts: 0,
  currentTxId: null,

  setStatus: (status) => set({ status }),

  addTransaction: (tx) =>
    set((state) => {
      const updated = [tx, ...state.transactions];
      localStorage.setItem("transactions", JSON.stringify(updated));
      return { transactions: updated };
    }),

  incrementAttempt: () =>
    set((state) => ({ attempts: state.attempts + 1 })),

  resetAttempts: () => set({ attempts: 0 }),

  setTxId: (id) => set({ currentTxId: id }),

  loadFromStorage: () => {
    const data = localStorage.getItem("transactions");
    if (data) {
      set({ transactions: JSON.parse(data) });
    }
  },
}));