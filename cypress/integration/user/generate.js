describe('Generate user', () => {
  before(async () => {
    await cy.exec('npx prisma migrate reset --force')
  })

  it('Should create a new user', () => {
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
    cy.visit('http://localhost:3000/user/generate')

    cy.get('input[id="mail"]').click().type('test@wellcode.com')
    cy.get('input[id="name"]').click().type('test name')
    cy.get('input[id="password"]').click().type('test password')

    cy.get('button[id="generate"').click()

    cy.contains('Email is already in use!')
  })
})