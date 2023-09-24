describe ('Supersecret user list', () => {
  before(() => {
  })

  it('Should not show the user list if the user is not logged in', () => {
    cy.visit('/supersecret_/user-list')
    cy.url().should('include', '/api/auth/signin')
  })
})