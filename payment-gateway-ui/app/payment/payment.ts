

export type PaymentStatus =
  | "IDLE"
  | "PROCESSING"
  | "SUCCESS"
  | "FAILED"
  | "TIMEOUT";

export type CardType = "VISA" | "MASTERCARD" | "AMEX" | "UNKNOWN";

export interface PaymentPayload {
  transactionId: string;
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
  amount: number;
  currency: "INR" | "USD";
}

export interface Transaction {
  id: string;
  amount: number;
  status: PaymentStatus;
  timestamp: string;
  attempts: number;
  error?: string;
}