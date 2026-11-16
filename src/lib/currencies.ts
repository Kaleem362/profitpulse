export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export const CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", name: "USD ($)" },
  { code: "EUR", symbol: "€", name: "EUR (€)" },
  { code: "GBP", symbol: "£", name: "GBP (£)" },
  { code: "CAD", symbol: "CA$", name: "CAD (CA$)" },
  { code: "AUD", symbol: "AU$", name: "AUD (AU$)" },
];

export function formatCurrency(amount: number, symbol: string = "$", decimals: number = 2): string {
  if (isNaN(amount) || !isFinite(amount)) return `${symbol}0.00`;
  const formatted = Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return amount < 0 ? `-${symbol}${formatted}` : `${symbol}${formatted}`;
}

