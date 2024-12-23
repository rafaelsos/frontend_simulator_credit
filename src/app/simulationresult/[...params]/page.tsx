import { Metadata } from 'next'

import { SimulationCreditResultScreen } from '@/presentation/screens/SimularionCreditResult/SimularionCreditResultScreen'

export const metadata: Metadata = {
  title: {
    template: '%s | Creditas',
    default: 'Resultado simulação de credito | Creditas',
  },
}

export default function SimulationResultScreen() {
  return <SimulationCreditResultScreen />
}
