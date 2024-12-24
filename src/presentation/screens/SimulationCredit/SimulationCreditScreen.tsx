'use client'

import { useRouter } from 'next/navigation'

import { InputSelectComponent } from '@/presentation/components/InputSelect/InputSelectComponent'
import { InputTextComponent } from '@/presentation/components/InputText/InputTextComponent'
import {
  installments,
  useSimulationCreditScreenRules,
} from './useSimulationCreditScreen.rules'

export const SimulationCreditScreen = () => {
  const router = useRouter()

  const {
    birthDate,
    setBirthDate,
    installment,
    setInstallment,
    requestedAmount,
    handleRequestedAmountInputChange,
  } = useSimulationCreditScreenRules()

  return (
    <section className="w-full h-screen bg-creditas">
      <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto px-8 max-md:pt-32">
        <div className="flex flex-col px-4  md:w-full md:h-screen md:justify-center max-md:px-12">
          <h2 className="max-w-xl text-balance text-3xl font-semibold text-gray-800">
            O crédito que abre portas para seus planos
          </h2>
          <p className="mt-2 max-w-xl text-balance text-lg text-gray-500">
            Na Creditas você consegue um crédito saudável de R$ 5 mil a R$ 150
            mil reais, com juros bem baixos e parcelas que cabem no seu
            orçamento. O empréstimo ideal pra você mudar sua vida pra melhor.
          </p>
        </div>

        <div className="flex flex-col px-8 max-md:px-12 md:ml-4 md:w-full max-md:mt-8 md:h-screen md:justify-center">
          <div className="w-full flex flex-col mb-4 md:w-2/3">
            <InputTextComponent
              name="requestedAmount"
              label="Valor do emprestimo"
              placeholder="Valor do emprestimo"
              type="text"
              value={requestedAmount}
              onChange={({ target }) => {
                handleRequestedAmountInputChange(target.value)
              }}
            />
          </div>

          <div className="w-full flex flex-col mb-4 md:w-2/3">
            <InputSelectComponent
              name="installment"
              label="Prazo de pagamento (meses)"
              value={installment}
              onChange={({ target }) => setInstallment(parseInt(target.value))}
              options={installments}
            />
          </div>

          <div className="w-full flex flex-col mb-4 md:w-2/3">
            <InputTextComponent
              name="birthDate"
              label="Data de nascimento"
              placeholder="Data de nascimento"
              type="date"
              value={birthDate}
              onChange={({ target }) => setBirthDate(target.value)}
            />
          </div>

          <div className="w-full flex flex-col my-4 md:w-2/3">
            <button
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-gray-800 py-2 px-4 rounded-md"
              disabled={!requestedAmount || !installment || !birthDate}
              onClick={() => {
                router.push(
                  `/simulationresult/params?requested=${requestedAmount}&installment=${installment}&birthDate=${birthDate}`
                )
              }}
            >
              Simular
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
