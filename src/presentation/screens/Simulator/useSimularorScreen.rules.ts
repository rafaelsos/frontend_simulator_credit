import { useMemo, useState } from 'react'

import { formatCurrencyUtil, parseCurrencyUtil } from '@/application/utils'
import { IInputSelectOptions } from '@/presentation/components/InputSelect/InputSelectComponent.types'

export const installments: IInputSelectOptions[] = [
  {
    value: '',
    label: 'Selecione o prazo de pagamento (meses)',
    disabled: true,
  },
  { value: 12, label: '12 meses' },
  { value: 24, label: '24 meses' },
  { value: 36, label: '36 meses' },
  { value: 48, label: '48 meses' },
  { value: 60, label: '60 meses' },
]

export const useSimulatorScreenRules = () => {
  const [requestedAmount, setRequestedAmount] = useState<string>('R$ 5.000,00')
  const [installment, setInstallment] = useState<number>(12)
  const [birthDate, setBirthDate] = useState<string>('')

  const handleRequestedAmountInputChange = (value: string) => {
    const numericValue = parseCurrencyUtil(value)

    if (!isNaN(numericValue)) {
      setRequestedAmount(formatCurrencyUtil(numericValue))
    } else {
      setRequestedAmount(value)
    }
  }

  const handleBirthDate = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    const age = today.getFullYear() - birth.getFullYear()

    return today.getMonth() > birth.getMonth() ||
      (today.getMonth() === birth.getMonth() &&
        today.getDate() >= birth.getDate())
      ? age
      : age - 1
  }

  const handleAnnualInterestRate = (age: number) => {
    if (age <= 25) return 0.05
    if (age <= 40) return 0.03
    if (age <= 60) return 0.02
    return 0.04
  }

  const simulationResult = useMemo(() => {
    const age = handleBirthDate(birthDate)
    const annualInterestRate = handleAnnualInterestRate(age)
    const monthlyInterestRate = annualInterestRate / 12

    const totalInstallment =
      (parseCurrencyUtil(requestedAmount) * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -installment))

    const totalInterest = totalInstallment * installment

    return {
      totalInstallment: formatCurrencyUtil(totalInstallment),
      totalInterest: formatCurrencyUtil(totalInterest),
      totalInterestPaid: formatCurrencyUtil(
        totalInterest - parseCurrencyUtil(requestedAmount)
      ),
    }
  }, [birthDate, installment, requestedAmount])

  return {
    ...simulationResult,
    requestedAmount,
    installment,
    setInstallment,
    birthDate,
    setBirthDate,
    handleRequestedAmountInputChange,
  }
}
