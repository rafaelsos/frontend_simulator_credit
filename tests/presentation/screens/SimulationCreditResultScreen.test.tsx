import { render, screen } from '@testing-library/react'
import React from 'react'

import { SimulationCreditResultScreen } from '@/presentation/screens/SimularionCreditResult/SimularionCreditResultScreen'
import { useSimulationCreditResultScreenRules } from '@/presentation/screens/SimularionCreditResult/useSimulationCreditResultScreen.rules'

jest.mock(
  '@/presentation/screens/SimularionCreditResult/useSimulationCreditResultScreen.rules',
  () => ({
    useSimulationCreditResultScreenRules: jest.fn(),
  })
)

const mockUseSimulationCreditResultScreenRules =
  useSimulationCreditResultScreenRules as jest.Mock

describe('SimulationCreditResultScreen', () => {
  beforeEach(() => {
    mockUseSimulationCreditResultScreenRules.mockReturnValue({
      totalInstallment: 'R$ 500,00',
      totalInterest: 'R$ 6.000,00',
      totalInterestPaid: 'R$ 1.000,00',
      requestedAmount: 'R$ 5.000,00',
      installment: 12,
      birthDate: '2000-01-01',
    })
  })

  it('should render the SimulationCreditResultScreen component', () => {
    render(<SimulationCreditResultScreen />)

    expect(
      screen.getByText('Resultado da simulação de crédito.')
    ).toBeInTheDocument()
    expect(screen.getByText('Valor da parcela')).toBeInTheDocument()
    expect(screen.getByText('R$ 500,00')).toBeInTheDocument()
    expect(screen.getByText('Total a ser pago')).toBeInTheDocument()
    expect(screen.getByText('R$ 6.000,00')).toBeInTheDocument()
    expect(screen.getByText('Total de juros pagos')).toBeInTheDocument()
    expect(screen.getByText('R$ 1.000,00')).toBeInTheDocument()
  })

  it('should have a link to simulate again', () => {
    render(<SimulationCreditResultScreen />)

    const link = screen.getByText('← Simular novamente')
    expect(link).toBeInTheDocument()
    expect(link.closest('a')).toHaveAttribute('href', '/')
  })
})
