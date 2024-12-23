import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { SimulatorScreen } from '@/presentation/screens/Simulator/SimulatorScreen'
import { useSimulatorScreenRules } from '@/presentation/screens/Simulator/useSimularorScreen.rules'

jest.mock('@/presentation/screens/Simulator/useSimularorScreen.rules', () => ({
  useSimulatorScreenRules: jest.fn(),
  installments: [
    { value: 1, label: '1x' },
    { value: 2, label: '2x' },
    { value: 3, label: '3x' },
  ],
}))

const mockHandleRequestedAmountInputChange = jest.fn()
const mockSetInstallment = jest.fn()
const mockSetBirthDate = jest.fn()

describe('SimulatorScreen', () => {
  beforeEach(() => {
    ;(useSimulatorScreenRules as jest.Mock).mockReturnValue({
      birthDate: '',
      setBirthDate: mockSetBirthDate,
      installment: '',
      setInstallment: mockSetInstallment,
      requestedAmount: '',
      totalInstallment: 'R$ 0,00',
      totalInterest: 'R$ 0,00',
      totalInterestPaid: 'R$ 0,00',
      handleRequestedAmountInputChange: mockHandleRequestedAmountInputChange,
    })
  })

  it('should renders the SimulatorScreen component', () => {
    render(<SimulatorScreen />)

    expect(
      screen.getByText('O crédito que abre portas para seus planos')
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Na Creditas você consegue um crédito saudável de R$ 5 mil a R$ 150 mil reais, com juros bem baixos e parcelas que cabem no seu orçamento. O empréstimo ideal pra você mudar sua vida pra melhor.'
      )
    ).toBeInTheDocument()
  })

  it('should handles requested amount input changes', () => {
    render(<SimulatorScreen />)

    fireEvent.change(screen.getByPlaceholderText('Valor do emprestimo'), {
      target: { value: '10000' },
    })
    expect(mockHandleRequestedAmountInputChange).toHaveBeenCalledWith('10000')
  })

  it('should call setBirthDate when changing the birth date input', () => {
    render(<SimulatorScreen />)

    fireEvent.change(screen.getByPlaceholderText('Data de nascimento'), {
      target: { value: '1990-01-01' },
    })
    expect(mockSetBirthDate).toHaveBeenCalledWith('1990-01-01')
  })

  it('should call setInstallment when selecting an installment', () => {
    render(<SimulatorScreen />)

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } })

    expect(mockSetInstallment).toHaveBeenCalledWith(2)
  })

  it('should displays the simulation results correctly', () => {
    ;(useSimulatorScreenRules as jest.Mock).mockReturnValue({
      ...useSimulatorScreenRules(),
      totalInstallment: 'R$ 1.000,00',
      totalInterest: 'R$ 100,00',
      totalInterestPaid: 'R$ 1.100,00',
    })

    render(<SimulatorScreen />)

    expect(screen.getByText('R$ 1.000,00')).toBeInTheDocument()
    expect(screen.getByText('R$ 100,00')).toBeInTheDocument()
    expect(screen.getByText('R$ 100,00')).toBeInTheDocument()
  })
})
