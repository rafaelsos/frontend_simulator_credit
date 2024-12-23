'use client'

import { InputSelectComponent } from '@/presentation/components/InputSelect/InputSelectComponent'
import { InputTextComponent } from '@/presentation/components/InputText/InputTextComponent'
import {
  installments,
  useSimulatorScreenRules,
} from './useSimularorScreen.rules'

export const SimulatorScreen = () => {
  const {
    birthDate,
    setBirthDate,
    installment,
    setInstallment,
    requestedAmount,
    totalInstallment,
    totalInterest,
    totalInterestPaid,
    handleRequestedAmountInputChange,
  } = useSimulatorScreenRules()

  return (
    <section className="w-full h-screen bg-[#f1f3f2]">
      <div className="grid grid-cols-2 container mx-auto">
        <div className="w-full h-screen px-4 flex justify-center flex-col">
          <h2 className="max-w-xl text-balance text-2xl font-semibold text-gray-800">
            O crédito que abre portas para seus planos
          </h2>
          <p className="mt-2 max-w-xl text-balance text-base  text-gray-500">
            Na Creditas você consegue um crédito saudável de R$ 5 mil a R$ 150
            mil reais, com juros bem baixos e parcelas que cabem no seu
            orçamento. O empréstimo ideal pra você mudar sua vida pra melhor.
          </p>

          <div className="flex flex-col container my-4">
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
                onChange={({ target }) =>
                  setInstallment(parseInt(target.value))
                }
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
          </div>
        </div>

        <div className="w-full h-screen px-4 flex justify-center flex-col">
          <div className="flex flex-col container my-4 bg-white rounded-md shadow-lg">
            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
              <p className="mt-2 max-w-lg text-balance font-semibold text-lg text-gray-900 text-center">
                Resultado da simulação
              </p>
            </div>

            <div className="flex flex-col items-center p-4 mb-8 mx-4">
              <h2 className="text-2xl text-gray-600">Valor da parcela</h2>
              <p className="text-3xl text-green-600">{totalInstallment}</p>

              <h2 className="text-lg text-gray-600 mt-2">Total a ser pago</h2>
              <p className="text-base text-gray-500">{totalInterest}</p>

              <h2 className="text-lg text-gray-600 mt-2">
                Total de juros pagos
              </h2>
              <p className="text-base text-gray-500">{totalInterestPaid}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
