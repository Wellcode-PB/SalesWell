describe('Generate users', () => {
  it('Should not have permissions when not logged in', () => {
    cy.visit('http://localhost:3000/user/generate')
    cy.contains('You do not have enough permissions for this action!')

    cy.get('input[id="mail"]').should('not.exist')
    cy.get('input[id="name"]').should('not.exist')
    cy.get('input[id="password"]').should('not.exist')

    cy.get('button[id="generate"').should('not.exist')

    cy.contains('User successfully created!').should('not.exist')
    cy.contains('Email is already in use!').should('not.exist')

    cy.request({
      method: 'POST',
      url: '/api/user/generate',
      failOnStatusCode: false,
      body: {
        mail: 'test@wellcode.com',
        name: 'test name',
        password: 'test password'
      }
    }).its('status').should('eq', 403)
  })

  it('Should not have permissions when not logged in as admin', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/user/generate')
    cy.contains('You do not have enough permissions for this action!')

    cy.get('input[id="mail"]').should('not.exist')
    cy.get('input[id="name"]').should('not.exist')
    cy.get('input[id="password"]').should('not.exist')

    cy.get('button[id="generate"').should('not.exist')

    cy.contains('User successfully created!').should('not.exist')
    cy.contains('Email is already in use!').should('not.exist')

    cy.request({
      method: 'POST',
      url: '/api/user/generate',
      failOnStatusCode: false,
      body: {
        mail: 'test@wellcode.com',
        name: 'test name',
        password: 'test password'
      }
    }).its('status').should('eq', 403)
  })

  it('Should create a new user', () => {
    cy.login('admin@example.com', 'password')
    cy.visit('http://localhost:3000/user/generate')
    cy.contains('You do not have enough permissions for this action!').should('not.exist')

    cy.get('input[id="mail"]').click().type('test@wellcode.com')
    cy.get('input[id="name"]').click().type('test name')
    cy.get('input[id="password"]').click().type('test password')

    cy.get('button[id="generate"').click()

    // TODO create a team members list component to check that the user was 
    // actually created

    cy.contains('User successfully created!')
    cy.contains('Email is already in use!').should('not.exist')

    cy.request({
      method: 'POST',
      url: '/api/user/generate',
      body: {
        mail: 'newtest@wellcode.com',
        name: 'new test name',
        password: 'new test password'
      }
    }).its('status').should('eq', 201)
  })

  it('Should not create a user with existing email', () => {
    cy.login('admin@example.com', 'password')
    cy.visit('http://localhost:3000/user/generate')
    cy.contains('You do not have enough permissions for this action!').should('not.exist')

    cy.get('input[id="mail"]').click().type('test@wellcode.com')
    cy.get('input[id="name"]').click().type('test name')
    cy.get('input[id="password"]').click().type('test password')

    cy.get('button[id="generate"').click()

    cy.contains('User successfully created!').should('not.exist')
    cy.contains('Email is already in use!')
  })  
})