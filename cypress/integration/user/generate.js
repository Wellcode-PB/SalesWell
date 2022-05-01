describe('Generate users', () => {
  before(async () => {
    await cy.exec('dotenv -e .env.test -- npx prisma migrate reset --force')
  })

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