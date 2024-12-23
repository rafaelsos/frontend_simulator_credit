import { formatCurrencyUtil } from '@/application/utils/FormatCurrency/formatCurrencyUtil'

describe('FormatCurrencyUtil', () => {
  it('should format the currency correctly', () => {
    const value = 1234
    const formattedValue = formatCurrencyUtil(value)
    const normalizedFormattedValue = formattedValue.replace(/\s/g, ' ')
    const expectedValue = 'R$ 1.234,00'
    expect(normalizedFormattedValue).toBe(expectedValue)
  })

  it('should format the currency correctly when the value is zero', () => {
    const value = 0
    const formattedValue = formatCurrencyUtil(value)
    const normalizedFormattedValue = formattedValue.replace(/\s/g, ' ')
    const expectedValue = 'R$ 0,00'
    expect(normalizedFormattedValue).toBe(expectedValue)
  })
})
