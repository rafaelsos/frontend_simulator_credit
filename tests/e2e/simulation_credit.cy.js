describe('Simulation Credit Screen', () => {
  it('should fill out the form and navigate to the simulation result page', () => {
    cy.visit('http://localhost:3000/')

    cy.get('input[id="requestedAmount"]').type('10000')

    cy.get('select[id="installment"]').select('12')

    cy.get('input[id="birthDate"]').type('1990-01-01')

    cy.get('button').contains('Simular').click()

    cy.url().should('include', '/simulationresult')

    cy.get('h2').contains('Resultado da simulação de crédito.')
  })

  it('should fill out the form, navigate to the simulation result page, and then go back to the simulation form', () => {
    cy.visit('http://localhost:3000/')

    cy.get('input[id="requestedAmount"]').type('1234')

    cy.get('select[id="installment"]').select('24')

    cy.get('input[id="birthDate"]').type('1980-01-01')

    cy.get('button').contains('Simular').click()

    cy.url().should('include', '/simulationresult')

    cy.get('h2').contains('Resultado da simulação de crédito.')

    cy.get('a').contains('Simular novamente').click()

    cy.url().should('eq', 'http://localhost:3000/')

    cy.get('input[id="requestedAmount"]').should('be.visible')
  })

  it('should fill out the form, navigate to the simulation result page, and then go back to the home page using the header link', () => {
    cy.visit('http://localhost:3000/')

    cy.get('input[id="requestedAmount"]').type('33000')

    cy.get('select[id="installment"]').select('36')

    cy.get('input[id="birthDate"]').type('2000-01-01')

    cy.get('button').contains('Simular').click()

    cy.url().should('include', '/simulationresult')

    cy.get('h2').contains('Resultado da simulação de crédito.')

    cy.get('header a[href="/"]').click()

    cy.url().should('eq', 'http://localhost:3000/')

    cy.get('input[id="requestedAmount"]').should('be.visible')
  })
})
