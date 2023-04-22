describe('User actions', () => {
  it('Should login with correct credentials', () => {
    cy.clearCookies()
    cy.visit('http://localhost:3000/')
    cy.get('button[id="login-button"]').click()

    cy.get('input[id="input-mail-for-credentials-provider"]').click()
      .type('normal@example.com')
    cy.get('input[id="input-password-for-credentials-provider"]').click()
      .type('password')
    cy.get('button').click()

    cy.url().should('eq', 'http://localhost:3000/')
    cy.contains('Welcome back, normal user')
    cy.contains('Logout')
  })

  it('Should logout', () => {
    cy.contains('Logout').click()

    cy.contains('Login')
    cy.contains('Logout').should('not.exist')
    cy.contains('Welcome back, normal user').should('not.exist')
  })

  it('Should not login with incorrect user / password combination', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Login')
    cy.contains('Logout').should('not.exist')

    cy.get('button[id="login-button"]').click()
    cy.get('input[id="input-mail-for-credentials-provider"]').click()
      .type('invalid@email.com')
    cy.get('input[id="input-password-for-credentials-provider"]').click()
      .type('invalid password')
    
    // The only button on signing page
    cy.get('button').click()
    cy.contains('Sign in failed')

    cy.get('input[id="input-mail-for-credentials-provider"]').click()
      .type('test@wellcode.com')
    cy.get('input[id="input-password-for-credentials-provider"]').click()
      .type('invalid password')
    
    cy.get('button').click()
    cy.contains('Sign in failed')
  })
})