import { fireEvent, render, screen } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import React from 'react'

import { SimulationCreditScreen } from '@/presentation/screens/SimulationCredit/SimulationCreditScreen'
import { useSimulationCreditScreenRules } from '@/presentation/screens/SimulationCredit/useSimulationCreditScreen.rules'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock(
  '@/presentation/screens/SimulationCredit/useSimulationCreditScreen.rules',
  () => ({
    useSimulationCreditScreenRules: jest.fn(),
    installments: [
      { value: 12, label: '12 meses' },
      { value: 24, label: '24 meses' },
      { value: 36, label: '36 meses' },
      { value: 48, label: '48 meses' },
      { value: 60, label: '60 meses' },
    ],
  })
)

const mockHandleRequestedAmountInputChange = jest.fn()
const mockSetInstallment = jest.fn()
const mockSetBirthDate = jest.fn()
const mockPush = jest.fn()
const mockRouter = useRouter as jest.Mock
const mockUseSimulationCreditScreenRules =
  useSimulationCreditScreenRules as jest.Mock

describe('SimulationCreditScreen', () => {
  beforeEach(() => {
    mockRouter.mockReturnValue({
      push: mockPush,
    })
    ;(useSimulationCreditScreenRules as jest.Mock).mockReturnValue({
      birthDate: '',
      setBirthDate: mockSetBirthDate,
      installment: 12,
      setInstallment: mockSetInstallment,
      requestedAmount: 'R$ 5.000,00',
      handleRequestedAmountInputChange: mockHandleRequestedAmountInputChange,
    })
  })

  it('should render the SimulationCreditScreen component', () => {
    render(<SimulationCreditScreen />)

    expect(
      screen.getByText('O crédito que abre portas para seus planos')
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Na Creditas você consegue um crédito saudável de R$ 5 mil a R$ 150 mil reais, com juros bem baixos e parcelas que cabem no seu orçamento. O empréstimo ideal pra você mudar sua vida pra melhor.'
      )
    ).toBeInTheDocument()
  })

  it('should handle requested amount input changes', () => {
    render(<SimulationCreditScreen />)

    const input = screen.getByPlaceholderText('Valor do emprestimo')
    fireEvent.change(input, { target: { value: 'R$ 10.000,00' } })

    expect(mockHandleRequestedAmountInputChange).toHaveBeenCalledWith(
      'R$ 10.000,00'
    )
  })

  it('should call setInstallment when selecting an installment', () => {
    render(<SimulationCreditScreen />)

    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: '24' } })

    expect(mockSetInstallment).toHaveBeenCalledWith(24)
  })

  it('should call setBirthDate when changing the birth date input', () => {
    render(<SimulationCreditScreen />)

    const input = screen.getByPlaceholderText('Data de nascimento')
    fireEvent.change(input, { target: { value: '2000-01-01' } })

    expect(mockSetBirthDate).toHaveBeenCalledWith('2000-01-01')
  })

  it('should disable the button when required fields are empty', () => {
    mockUseSimulationCreditScreenRules.mockReturnValue({
      birthDate: '',
      setBirthDate: mockSetBirthDate,
      installment: 0,
      setInstallment: mockSetInstallment,
      requestedAmount: '',
      handleRequestedAmountInputChange: mockHandleRequestedAmountInputChange,
    })

    render(<SimulationCreditScreen />)

    const button = screen.getByText('Simular')
    expect(button).toBeDisabled()
  })

  it('should enable the button when required fields are filled', () => {
    mockUseSimulationCreditScreenRules.mockReturnValue({
      birthDate: '2000-01-01',
      setBirthDate: mockSetBirthDate,
      installment: 12,
      setInstallment: mockSetInstallment,
      requestedAmount: 'R$ 5.000,00',
      handleRequestedAmountInputChange: mockHandleRequestedAmountInputChange,
    })

    render(<SimulationCreditScreen />)

    const button = screen.getByText('Simular')
    expect(button).not.toBeDisabled()
  })
})
