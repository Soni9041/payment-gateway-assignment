export const validateExpiry = (value: string) => {
  const [month, year] = value.split("/").map(Number);
  if (!month || month > 12) return false;

  const now = new Date();
  const expiry = new Date(2000 + year, month);
  return expiry > now;
};

export const validateCVV = (cvv: string, type: string) => {
  if (type === "AMEX") return /^\d{4}$/.test(cvv);
  return /^\d{3}$/.test(cvv);
};