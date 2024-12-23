import { useState } from 'react'

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

export const useSimulationCreditScreenRules = () => {
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

  return {
    requestedAmount,
    installment,
    setInstallment,
    birthDate,
    setBirthDate,
    handleRequestedAmountInputChange,
  }
}
