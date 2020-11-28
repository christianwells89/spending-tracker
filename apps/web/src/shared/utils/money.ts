import { Currency } from '@st/types';
import australianFlag from 'shared/assets/flags/icons8-australia-30.png';
import usaFlag from 'shared/assets/flags/icons8-usa-30.png';

export function formatMoney(amount: number, currency: Currency): string {
  // I think this will use the default locale
  return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount);
}

export function formatMoneyRaw(amount: string): string {
  return Number.parseFloat(amount).toFixed(2);
}

export const CurrencyLabel = new Map<Currency, string>([
  [Currency.AUD, 'AU$'],
  [Currency.USD, 'US$'],
]);

export const CurrencyIconUrl: Record<Currency, string> = {
  [Currency.AUD]: australianFlag,
  [Currency.USD]: usaFlag,
};

export function difference(num1: number, num2: number): number {
  const change = Math.abs(num1 - num2);

  if (num1 > num2) {
    return change * -1;
  }
  return change;
}
