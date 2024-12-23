'use client'

import { useSimulationCreditResultScreenRules } from './useSimulationCreditResultScreen.rules'

export const SimulationCreditResultScreen = () => {
  const { totalInstallment, totalInterest, totalInterestPaid } =
    useSimulationCreditResultScreenRules()

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="mx-auto max-w-md">
        <p className="text-center space-y-6 py-8 text-lg leading-7 text-gray-600">
          Resultado da simulação de crédito.
        </p>

        <div className=" bg-white rounded-md shadow-lg px-24 py-12 max-w-md ">
          <div className="flex flex-col text-center flex-1 justify-items-center gap-4">
            <h2 className="text-2xl text-gray-600">Valor da parcela</h2>
            <p className="text-3xl text-green-600">{totalInstallment}</p>

            <h2 className="text-lg text-gray-600 mt-2">Total a ser pago</h2>
            <p className="text-base text-gray-500">{totalInterest}</p>

            <h2 className="text-lg text-gray-600 mt-2">Total de juros pagos</h2>
            <p className="text-base text-gray-500">{totalInterestPaid}</p>
          </div>
        </div>

        <div className="pt-8 text-base font-semibold leading-7">
          <p>
            <a href="/" className="text-green-800 hover:text-green-700">
              &larr; Simular novamente
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
