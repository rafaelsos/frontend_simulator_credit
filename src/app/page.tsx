import { Metadata } from 'next'

import { SimulationCreditScreen } from '@/presentation/screens/SimulationCredit/SimulationCreditScreen'

export const metadata: Metadata = {
  title: {
    template: '%s | Creditas',
    default: 'Simular credito | Creditas',
  },
}

export default function SimulationCredit() {
  return <SimulationCreditScreen />
}
