import { Metadata } from 'next'

import { SimulatorScreen } from '@/presentation/screens/Simulator/SimulatorScreen'

export const metadata: Metadata = {
  title: {
    template: '%s | Creditas',
    default: 'Simular credito old | Creditas',
  },
}

export default function Simulation() {
  return <SimulatorScreen />
}
