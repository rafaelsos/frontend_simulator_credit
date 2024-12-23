export const parseCurrencyUtil = (value: string) => {
  return Number(value.replace(/\D/g, '')) / 100
}
