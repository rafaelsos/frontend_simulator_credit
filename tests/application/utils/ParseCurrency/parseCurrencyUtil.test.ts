import { parseCurrencyUtil } from '@/application/utils/ParseCurreny/parseCurrencyUtil'

describe('ParseCurrencyUtil', () => {
  it('should convert a currency string to a number correctly', () => {
    const value = 'R$ 1.234,56'
    const convertedValue = parseCurrencyUtil(value)
    expect(convertedValue).toBe(1234.56)
  })

  it('should convert a currency string without thousand separator to a number correctly', () => {
    const value = 'R$ 123,45'
    const convertedValue = parseCurrencyUtil(value)
    expect(convertedValue).toBe(123.45)
  })

  it('should convert a currency string with only cents to a number correctly', () => {
    const value = 'R$ 0,99'
    const convertedValue = parseCurrencyUtil(value)
    expect(convertedValue).toBe(0.99)
  })

  it('should convert a currency string with an integer value to a number correctly', () => {
    const value = 'R$ 1000,00'
    const convertedValue = parseCurrencyUtil(value)
    expect(convertedValue).toBe(1000.0)
  })
})
