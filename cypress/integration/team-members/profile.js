describe('Team members profile info', () => {
  it('Should not have permissions when not logged in', () => {
    cy.visit('http://localhost:3000/team-members/profile/admin_member6@gmail.com')

    cy.contains('Welcome to SalesWell')
  })

  it('Should not be able to delete a team member if not admin', () => {
    cy.login('normal@example.com', 'password')

    cy.visit('http://localhost:3000/team-members/profile/admin_member6@gmail.com')
    cy.get('#profile-action').click()
    cy.get('#delete-button').should('not.exist')
    cy.visit('http://localhost:3000/team-members/profile/admin_member8@gmail.com')

    cy.request({
      method: 'DELETE',
      url: '/api/team-member/admin_member8@gmail.com',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(403);
    });
  })
  
  it('Should have permissions to view the profiles when logged in as a user', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/team-members/list')
  
      // open team member six with ADMIN role profile by clicking on the team
      // member card
      cy.get('div[id="admin_member6@gmail.com"]').click();
      cy.get('div[id="team-member"]')
      cy.contains('Team Member 6')
      cy.contains('ADMIN')
      cy.contains('admin_member6@gmail.com')
      cy.go('back')

      // open team member one with USER role profile by clicking on the team
      // member card
      cy.get('div[id="team_member1@gmail.com"]').click()
      cy.get('div[id="team-member"]')
      cy.contains('Team Member 1')
      cy.contains('USER')
      cy.contains('team_member1@gmail.com')
  })  
  
  it('Should load CustomError component when team member not found', () => {
    cy.login('normal@example.com', 'password');
    const index = Math.floor(Math.random() * 25) + 25;
    cy.visit('http://localhost:3000/team-members/profile/admin_member' + index +
      '@gmail.com')
    cy.get('.error-title').contains('Team member not found');
    cy.get('.error-message').contains(`The team member you are searching for does not exist.`)
  })
  
  it('Cancel deletion on the team member dialog when logged in as admin', () => {
    cy.login('admin@example.com', 'password');
    cy.visit('http://localhost:3000/team-members/list')
  
    cy.get('div[id="admin_member10@gmail.com"]').click()
  
    cy.get('#profile-action').click()
    cy.get('#delete-button').should('be.visible')
  
    cy.get('ul li').should('have.length', 1)
    cy.get('#delete-button').click()
    cy.get('#modal-confirm').should('be.visible')
    cy.get('#confirm-action-message')
      .should('be.visible')
      .contains('Are you sure you want to delete Team Member 10?')
    cy.get('#cancel-action').should('be.visible')
    cy.get('#cancel-action').click()
    cy.get('#modal-confirm').should('not.exist')
    cy.go('back')
  
    cy.get('div[id="admin_member10@gmail.com"]').should('exist')
  })
  
  it('Team member should be deleted after dialog confirm when logged in as admin', () => {
    cy.login('admin@example.com', 'password')
    cy.visit('http://localhost:3000/team-members/list')

    cy.get('div[id="admin_member10@gmail.com"]').click()

    cy.get('#profile-action').click()
    cy.get('#delete-button').should('be.visible')

    cy.get('ul li').should('have.length', 1)
    cy.get('#delete-button').click()
    cy.get('#modal-confirm').should('be.visible')
    cy.get('#confirm-action-message')
      .should('be.visible')
      .contains('Are you sure you want to delete Team Member 10?')
    cy.get('#confirm-action').should('be.visible')
    cy.get('#confirm-action').click()

    cy.url().should('eq', 'http://localhost:3000/team-members/list')

    cy.get('div[id="admin_member10@gmail.com"]').should('not.exist')

    cy.request({
      method: 'DELETE',
      url: '/api/team-member/admin_member9@gmail.com'
    }).then((response) => {
      expect(response.status).to.equal(201)
    })
  })
})