describe('User', () => {
  describe('Generate users', () => {
    it('Should not have permissions when not logged in', () => {
      cy.visit('http://localhost:3000/user/generate')
      cy.get('input[id="mail"]').click().type('test@wellcode.com')
      cy.get('input[id="name"]').click().type('test name')
      cy.get('input[id="password"]').click().type('test password')
  
      cy.get('button[id="generate"').click()
      cy.contains('You do not have enough permissions for this action!')
      cy.contains('User successfully created!').should('not.exist')
    })
  
    it('Should not have permissions when not logged in as admin', () => {
      cy.login('normal@example.com', 'password')
      cy.visit('http://localhost:3000/user/generate')
      cy.get('input[id="mail"]').click().type('test@wellcode.com')
      cy.get('input[id="name"]').click().type('test name')
      cy.get('input[id="password"]').click().type('test password')
  
      cy.get('button[id="generate"').click()
      cy.contains('You do not have enough permissions for this action!')
      cy.contains('User successfully created!').should('not.exist')
    })
  
    it('Should create a new user', () => {
      cy.login('admin@example.com', 'password')
      cy.visit('http://localhost:3000/user/generate')
  
      cy.get('input[id="mail"]').click().type('test@wellcode.com')
      cy.get('input[id="name"]').click().type('test name')
      cy.get('input[id="password"]').click().type('test password')
  
      cy.get('button[id="generate"').click()
  
      // TODO create a team members list component to check that the user was 
      // actually created
  
      cy.contains('User successfully created!')
    })
  
    it('Should not create a user with existing email', () => {
      cy.login('admin@example.com', 'password')
      cy.visit('http://localhost:3000/user/generate')
  
      cy.get('input[id="mail"]').click().type('test@wellcode.com')
      cy.get('input[id="name"]').click().type('test name')
      cy.get('input[id="password"]').click().type('test password')
  
      cy.get('button[id="generate"').click()
  
      cy.contains('Email is already in use!')
    })  
  })
  
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
      cy.contains('Welcome to SalesWell normal user')
      cy.contains('Logout')
    })
  
    it('Should logout', () => {
      cy.contains('Logout').click()
  
      cy.contains('Login')
      cy.contains('Logout').should('not.exist')
      cy.contains('Welcome to SalesWell normal user').should('not.exist')
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

  after(() => {
    cy.doneTesting('team_members')
  })
})
