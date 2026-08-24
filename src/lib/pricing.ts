export const DEPOSIT_PERCENT = 20;

export function calcDeposit(priceAgorot: number) {
  return Math.round((priceAgorot * DEPOSIT_PERCENT) / 100);
}

export function formatILS(amount: number) {
  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(amount);
}
