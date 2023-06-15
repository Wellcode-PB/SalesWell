describe('List team members', () => {
  before(() => {
      cy.task('db:seedTeamMembers')
    }
  )
  it('Should not have permissions when not logged in', () => {
    cy.visit('http://localhost:3000/team-members/list')

    cy.contains('Welcome to SalesWell')
  })
  
  it('Should have permissions when logged in as user', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/team-members/list')

    cy.contains('admin user').should('exist')
    cy.contains('admin@example.com').should('exist')
    cy.contains('ADMIN').should('exist')

    // This is the test for team members with ADMIN role
    for (let i = 6; i <= 10; i++) {
      cy.contains(`Team Member ${i}`).should('exist')
      cy.contains(`admin_member${i}@gmail.com`).should('exist')
      cy.contains('ADMIN').should('exist')
    }

    cy.scrollTo('bottom')

    // This is the test for team members with USER role
    for (let i = 1; i <= 5; i++) {
      cy.contains(`Team Member ${i}`).should('exist')
      cy.contains(`team_member${i}@gmail.com`).should('exist')
      cy.contains('USER').should('exist')

    }
    
    cy.contains('normal user').should('exist')
    cy.contains('normal@example.com')
    cy.contains('USER').should('exist')
  })
})