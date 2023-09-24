describe('Booking status', () => {
  it('Should not have permissions when not logged in', () => {
    cy.visit('/booking/list')
    
    cy.contains('Welcome to SalesWell')

    cy.contains('No status').should('not.exist')
    cy.contains('active').should('not.exist')
    cy.contains('canceled').should('not.exist')
  })

  it('Should have permissions when logged in as user', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('/booking/list')
    
    cy.contains('No status')

    cy.contains('active').should('not.exist')
    cy.contains('canceled').should('not.exist')
  })

  it('Should have permissions when logged in as admin', () => {
    cy.login('admin@example.com', 'password')
    cy.visit('/booking/list')
    
    cy.contains('No status')

    cy.contains('active').should('not.exist')
    cy.contains('canceled').should('not.exist')
  })

  it('Change status when status button is clicked and another status is chosen', 
    () => {
    cy.login('normal@example.com', 'password')
    cy.visit('/booking/list')
    
    cy.contains('No status')
    cy.contains('active').should('not.exist')
    cy.contains('canceled').should('not.exist')
    
    cy.get('button[id="status-A-1"]').click()
    cy.get('li[id="active"]').click()

    cy.contains('No status')
    cy.contains('active')
    cy.get('button[id="status-A-1"]').contains('No status').should('not.exist')
    cy.contains('canceled').should('not.exist')

    cy.get('button[id="status-B-2"]').click()
    cy.get('li[id="canceled"]').click()

    cy.contains('No status')
    cy.contains('active')
    cy.contains('canceled')

    cy.get('button[id="status-A-1"]').contains('No status').should('not.exist')
    cy.get('button[id="status-B-2"]').contains('No status').should('not.exist')
  })

  it('Check if the statuses have been updated in the database', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('/booking/list')

    cy.contains('No status')
    cy.contains('active')
    cy.contains('canceled')

    cy.get('button[id="status-A-1"]').contains('No status').should('not.exist')
    cy.get('button[id="status-B-2"]').contains('No status').should('not.exist')
  })
})