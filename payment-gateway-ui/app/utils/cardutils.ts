export const detectCardType = (num: string) => {
  if (/^4/.test(num)) return "VISA";
  if (/^5[1-5]/.test(num)) return "MASTERCARD";
  if (/^3[47]/.test(num)) return "AMEX";
  return "UNKNOWN";
};