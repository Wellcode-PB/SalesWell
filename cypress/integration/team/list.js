

describe('List prospects', () => {
  before(() => {
      cy.task('db:seedTeamMembers')
    }
  )
  it('Should not have permissions when not logged in', () => {
    cy.visit('http://localhost:3000/team/list')

    cy.contains('admin user').should('not.exist')
    cy.contains('Welcome to SalesWell')
  })
  it('Should have permissions when logged in as user', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/team/list')

    cy.contains('admin user').should('exist')
    cy.contains('Team Member 10').should('exist')
    cy.contains('admin@example.com').should('exist')
    cy.contains('ADMIN').should('exist')

    cy.scrollTo('bottom')
    cy.contains('Team Member 3').should('exist')
    cy.contains('team_member3@gmail.com').should('exist')
    cy.contains('USER').should('exist')
  })
})