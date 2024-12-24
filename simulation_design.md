
# Sistema de Simulação e Proposta de Empréstimos


# 1. Introdução
Este sistema permitirá aos usuários realizar simulações financeiras e receber propostas personalizadas com base em seus dados financeiros.
As decisões aqui descritas foram projetadas para atender aos requisitos de escalabilidade, resiliência e manutenibilidade.

# 2. Desenho da Arquitetura

#### Visão Geral

A arquitetura do sistema foi projetada utilizando uma abordagem modular e escalável. Os principais componentes são:

1. **Interface de Usuário (Frontend)**:
   - Desenvolvida com **React** e **Next.js** para suportar **Server-Side Rendering (SSR)**, melhorando o desempenho e a indexação por motores de busca.
   - Comunicação com o backend é feita via chamadas a APIs REST hospedadas em uma infraestrutura serverless.

2. **Backend**:
   - Implementado em um ambiente **serverless** utilizando **AWS Lambda**.
   - A API é construída para ser escalável e eficiente, aproveitando os serviços da AWS para execução sob demanda.
   - Gerenciamento de rotas e funções REST é feito com **API Gateway**.
   - Responsável por:
     - Processamento da lógica de negócios.
     - Validação de dados recebidos do frontend.
     - Comunicação com o banco de dados MongoDB.
     - Integração com serviços externos.

3. **Banco de Dados**:
   - Utilização de **MongoDB** como banco de dados principal, oferecendo flexibilidade na estrutura de dados.
   - Banco de dados hospedado no serviço **MongoDB Atlas**, com suporte a escalabilidade e alta disponibilidade.
   - Utilizado para armazenar:
     - Dados de simulações financeiras.
     - Resultados processados.
     - Dados dos usuários.

4. **Serviços Externos**:
   - Integração com **APIs externas** para validação de crédito e obtenção de taxas de mercado em tempo real.
   - As chamadas externas são feitas diretamente pelas funções Lambda.

#### Justificativa das Escolhas

- **Serverless com AWS Lambda**:
  - Escalabilidade automática: Permite atender a demandas variáveis sem necessidade de provisionamento de servidores.
  - Custo otimizado: Cobrança apenas pelo tempo de execução e recursos utilizados.
  - Integração com o ecossistema AWS, como API Gateway e DynamoDB (caso necessário no futuro).

- **MongoDB**:
  - Flexibilidade na estruturação de dados, permitindo rápidas alterações e maior agilidade no desenvolvimento.
  - Alta performance para consultas e gravações em grandes volumes de dados.

- **MongoDB Atlas**:
  - Banco de dados como serviço, com suporte a backups automáticos, monitoramento, e clusters globais para baixa latência.

- **Next.js**:
  - Framework moderno que combina renderização no lado do servidor (SSR) e na borda (Edge Functions), proporcionando melhor desempenho para os usuários e SEO aprimorado.

- **Integração com APIs externas**:
  - Necessária para fornecer dados atualizados, como taxas de juros e validações em tempo real.


# 3. Padrões de Projeto e Boas Práticas

*Frontend*
- **Arquitetura:**
  Utilizei **React com Next.js** para combinar renderização no servidor (**SSR**) e no cliente, garantindo performance e SEO.

- **Padrão:**
  - **Componentização:** Cada parte da interface foi dividida em componentes reutilizáveis, o que melhora a legibilidade e a manutenção.
  - **Separação de responsabilidades:**
    - **Telas (pages):** Responsáveis pela estrutura geral.
    - **Componentes:** Reutilizáveis, como botões, inputs e listas.
    - **Serviços:** Funções para comunicação com o backend.

- **Por quê?**
  Essa abordagem facilita o desenvolvimento colaborativo e melhora a manutenção ao longo do tempo.

---

*Backend*
- **Arquitetura:**
  Implementado em um modelo **serverless** utilizando **AWS Lambda**, com gerenciamento de APIs via **API Gateway** e banco de dados **MongoDB Atlas**.

- **Padrão:**
  - **Separação de leitura e escrita (CQRS):**
    Operações de simulação (leitura) e contratação (escrita) são tratadas de forma independente, otimizando desempenho e organização.
  - **Funções desacopladas:** Cada endpoint é gerido por uma função Lambda separada.

- **Por quê?**
  O modelo serverless escala automaticamente, reduz custos, e desacopla responsabilidades, facilitando a manutenção e o suporte a picos de tráfego.


---

#### Autenticação e Autorização

### Cenários

#### Simulação de empréstimos (usuário não autenticado):
- **Endpoint público:**
  `/api/v1/simulate` é acessível sem login.

- **Segurança:**
  - Validação e sanitização dos dados enviados pelo usuário para evitar ataques como **XSS** e **SQL Injection**.

- **Rate Limiting:**
  - Limitação do número de requisições por IP ou usuário para proteger contra abusos e ataques.

---

#### Contratação de empréstimos (usuário autenticado):
- **Token JWT:**
  Usuários autenticados recebem um token JWT após login.

- **Endpoint protegido:**
  `/api/v1/simulate/contract` exige um token válido no cabeçalho (`Authorization: Bearer <token>`).

- **Verificação do token:**
  - O backend valida:
    - Se o token é válido.
    - Se o token não expirou.


# 4. Considerações de Escalabilidade e Resiliência

#### Escalabilidade

1. **Serverless (AWS Lambda):**
   - A arquitetura serverless escala automaticamente com base no número de requisições, eliminando a necessidade de provisionar servidores manualmente.
   - Cada função Lambda é independente, permitindo escalabilidade horizontal sem impacto no desempenho.

2. **Banco de Dados MongoDB Atlas:**
   - Suporte a clusters distribuídos globalmente para baixa latência.
   - Escalabilidade automática ajustando capacidade de armazenamento e performance conforme a demanda aumenta.

3. **Rate Limiting:**
   - Controle no número de requisições por IP ou usuário, protegendo a infraestrutura contra picos repentinos de tráfego.

#### Resiliência

1. **Multi-regiões (AWS):**
   - As funções Lambda podem ser implantadas em múltiplas regiões, garantindo disponibilidade mesmo em caso de falhas regionais.

2. **Banco de Dados com Alta Disponibilidade:**
   - MongoDB Atlas oferece replicação automática, garantindo que os dados estejam disponíveis mesmo em caso de falha de um nó.

3. **Monitoramento e Alertas:**
   - Uso do AWS CloudWatch para monitorar métricas de desempenho e configurar alertas automáticos para anomalias ou falhas.

4. **Fallbacks e Retentativas:**
   - Em caso de falha ao acessar APIs externas, implemento retentativas automáticas com limites e tempos de espera crescentes (backoff exponencial).
   - Fallbacks garantem que o sistema continue funcional, mesmo que algumas integrações externas estejam indisponíveis.

# 5. API Design

#### Endpoints Principais
- **POST /simulate**:
  - **Descrição**: Recebe dados financeiros do usuário e retorna cenários simulados.
  - **Request**:
    ```json
    {
      "requestedAmount": 5000,
      "installments": 24
    }
    ```
  - **Response**:
    ```json
    {
      "monthlyPayment": 950.50,
      "totalPayment": 22812.00
    }
    ```

- **POST /simulate/contract**:
  - **Descrição**: Endpoint para contratação de empréstimos. Este endpoint é protegido e requer autenticação via JWT..
  - **Header**:
    ```json
      Authorization: Bearer <token>
    ```
  - **Request**:
    ```json
    {
      "requestedAmount": 20000,
      "installments": 36,
      "interestRate": 0.02, // 2% ao mês
      "userId": "12345",
      "paymentMethod": "debit"
    }
    ```
  - **Response**:
    ```json
    {
      "contractId": "98765",
      "requestedAmount": 20000,
      "installments": 36,
      "monthlyPayment": 741.21,
      "totalPayment": 26683.56,
      "interestRate": 0.02,
      "contractedAt": "2024-12-23T10:45:00Z",
      "dueDates": [
        "2025-01-23",
        "2025-02-23",
        "2025-03-23",
        "2025-04-23",
        "... (até 36 parcelas)"
      ]
    }

    ```

# 6. Motor de Simulação de Empréstimos

#### Funcionamento
O motor de simulação utiliza algoritmos financeiros para calcular os valores das parcelas e o total pago, considerando:

1. **Taxas de Juros Variáveis**:
   Baseadas em perfis de crédito e termos do empréstimo.

2. **Simulação de Cenários**:
   - Cenários otimizados para diferentes prazos (12, 24, 36 meses).
   - Possibilidade de gerar múltiplas opções ajustadas ao perfil do usuário.

---

#### Otimização
- **Estratégia**:
  Utilizar caching em memória (e.g., **Redis**) para armazenar resultados comuns, reduzindo a necessidade de cálculos repetidos.

- **Teste de Performance**:
  Garantir precisão e rapidez, simulando cenários com grandes volumes de dados (milhões de cálculos simultâneos).

---

#### Cálculos Precisos
- **Fórmulas Financeiras**:
  Utiliza a fórmula de juros compostos para calcular o valor das parcelas:
  \[
  PMT = P \cdot \frac{i \cdot (1 + i)^n}{(1 + i)^n - 1}
  \]
  - \(PMT\): Parcela mensal.
  - \(P\): Valor solicitado.
  - \(i\): Taxa de juros mensal.
  - \(n\): Número de parcelas.

- **Validação dos Resultados**:
  Testes automatizados verificam a precisão dos cálculos para diferentes taxas e prazos.

- **Performance do Motor**:
  - Código otimizado para executar os cálculos em paralelo, utilizando recursos modernos de computação em nuvem.
  - Acesso a dados pré-calculados via caching para respostas mais rápidas.

# 7. Considerações Finais

O design proposto oferece uma solução robusta, eficiente e escalável para atender aos requisitos de simulação e proposta de empréstimos.

O motor de simulação é projetado para ser:
- **Eficiente**: Capaz de calcular múltiplos cenários rapidamente.
- **Preciso**: Utiliza algoritmos financeiros rigorosos para garantir a exatidão dos cálculos.
- **Escalável**: Adoção de estratégias como caching e cálculos paralelos para atender a grandes volumes de dados.

As tecnologias e padrões escolhidos, como o modelo serverless, MongoDB Atlas e JWT para autenticação, foram pensados para garantir:
- **Segurança**: Proteção contra vulnerabilidades e transporte de dados seguro.
- **Desempenho**: Respostas rápidas e processamento otimizado.
- **Manutenibilidade**: Uma arquitetura modular e bem organizada, permitindo futuras evoluções com facilidade.

Com essa abordagem, o sistema está preparado para crescer e oferecer uma experiência confiável aos usuários. 🚀


