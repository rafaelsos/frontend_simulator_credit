# Simulador de Empréstimos

Este projeto é um simulador de empréstimos simples desenvolvido em **React** com **Next.js**. Ele permite que os usuários insiram informações básicas em um formulário para simular um empréstimo e, em seguida, exibe os resultados calculados.

---

## 🛠️ Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- Node.js versão 14 ou superior
- Yarn ou npm (gerenciador de pacotes)

---

## 🚀 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/rafaelsos/frontend_simulator_credit.git
   cd simulator_credit

## Instale as dependências:

Pode ser com `yarn install` ou `npm install`

## Como rodar o projeto:

Pode ser com `yarn dev` ou `npm run dev`

## Abra o navegador e acesse:

http://localhost:3000

## 🧪 Rodando os Testes
Para executar os testes unitários do projeto, use:

Pode ser com `yarn test` ou `npm run test`

## 🧪 Rodando os Testes E2E
Para executar os testes E2E do projeto, use:

`yarn cypress:open`

No Cypress, selecione o navegador desejado e clique em "Start E2E Testing".

Temos apenas esse test no momento `simulation_credit.cy`


---
## 📋 Funcionalidades

📝 Tela Inicial (/)
Pequeno formulário onde o usuário pode adicionar os campos necessários para a simulação de empréstimos.

📊 Tela de Resultados da Simulação (/simulationresult)
Realiza os cálculos com base nos dados fornecidos pelo usuário e exibe os resultados simulados.

---
## 🛠️ Tecnologias Utilizadas
React
Next.js
TypeScript
TailwindCSS
Jest para testes unitários
Cypress para testes e2e

---
## 📂 Estrutura do Projeto

```json
src/
├── app/
│   ├── simulationresult/
│   │   ├── page.tsx        # Tela de resultados
│   ├── page.tsx            # Tela inicial (formulário)
├── application/            # Utils para cálculo e formatação
│   ├── utils/              # Funções utilitárias
├── presentation/           # Camada de apresentação
│   ├── components/         # Componentes reutilizáveis
│   │   ├── Header/         # Cabeçalho da aplicação
│   │   ├── InputSelect/    # Componente de seleção
│   │   ├── InputText/      # Componente de input de texto
│   ├── screens/            # Screens do projeto
│   │   ├── SimulationCredit/         # Tela inicial da simulação de crédito
│   │   ├── SimulationCreditResult/   # Tela de resultados da simulação de crédito
tests/                      # Testes unitários e testes e2e

```

## 🧑‍💻 Autor
Feito com ❤️ por Rafael Sosnowski. Entre em contato e contribua! 😊



