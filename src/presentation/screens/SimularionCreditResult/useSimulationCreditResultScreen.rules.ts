'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

import { formatCurrencyUtil, parseCurrencyUtil } from '@/application/utils'

export const useSimulationCreditResultScreenRules = () => {
  const searchParams = useSearchParams()

  const requestedAmount = searchParams.get('requested')
  const installment = searchParams.get('installment')
  const birthDate = searchParams.get('birthDate')

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
    if (!requestedAmount || !installment || !birthDate) {
      return {
        totalInstallment: 'R$ 0,00',
        totalInterest: 'R$ 0,00',
        totalInterestPaid: 'R$ 0,00',
      }
    }

    const age = handleBirthDate(birthDate)
    const annualInterestRate = handleAnnualInterestRate(age)
    const monthlyInterestRate = annualInterestRate / 12

    const totalInstallment =
      (parseCurrencyUtil(requestedAmount) * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -installment))

    const totalInterest = totalInstallment * Number(installment)

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
    birthDate,
  }
}
