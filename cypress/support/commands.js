Cypress.Commands.add('login', (email, password) => { 
  cy.clearCookies()
  cy.visit('http://localhost:3000/')
  cy.get('button[id="login-button"]').click()

  cy.get('input[id="input-mail-for-credentials-provider"]').click()
    .type(email)
  cy.get('input[id="input-password-for-credentials-provider"]').click()
    .type(password)
  cy.get('button').click()
  cy.contains('Logout')
})
