describe('Prospects profile info', () => {
  it('Should have permissions when logged in as user', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/prospects/list')

    // open each prospect profile by clicking on the prospect card
    for (let index = 1; index < 10; ++index) {
      // open the prospect profile
      cy.get('div[id="prospect-' + index + '"').click()

      // check if the data rendered is correct
      cy.contains('Prospect ' + index)
      cy.contains('booking' + index + '@gmail.com')
      cy.contains('0777 777 77' + index)

      // go back to the prospect list page and continue
      cy.go('back')
    }
  })
  
  it('Should load CustomError component when user not found', () => {
    const index = Math.floor(Math.random() * 25) + 25
    cy.visit(`http://localhost:3000/prospects/profile/${index}`)
    cy.get('.error-title').contains('User not found')
    cy.get('.error-message').contains('The user you are searching for does not exist.')
  })

  it(`Cancel deletion on the prospect dialog`, () => {
    cy.login('normal@example.com', 'password');
    cy.visit('http://localhost:3000/prospects/list');
    
    // open the prospect profile
    cy.get('div[id="prospect-1"').click();

    // open the profile menu and check if it is visible
    cy.get('#profile-action').click(); 
    cy.get('#delete-button').should('be.visible');

    // click the first and only item in the main menu,
    // open the modal window, check if it is visible and cancel the action
    cy.get('ul li').should('have.length', 1);
    cy.get('#delete-button').click();
    cy.get('#modal-confirm').should('be.visible');
    cy.get('#confirm-action-message')
      .should('be.visible')
      .contains('Are you sure you want to delete Prospect 1?');
    cy.get('#cancel-action').should('be.visible');
    cy.get('#cancel-action').click();
    cy.get('#modal-confirm').should('not.exist');
    cy.go('back');

    // check that the prospect still exists in the list
    cy.get('div[id="prospect-1"]').should('exist');
  })

  it(`User should be deleted after dialog confirm`, () => {
    cy.login('normal@example.com', 'password');
    cy.visit('http://localhost:3000/prospects/list');

    // open the prospect profile
    cy.get('div[id="prospect-1"').click();

    // open the profile menu and check if it is visible
    cy.get('#profile-action').click();
    cy.get('#delete-button').should('be.visible');

    // click the first and only item in the main menu,
    // open the modal window, check if it is visible and confirm the action
    cy.get('ul li').should('have.length', 1);
    cy.get('#delete-button').click();
    cy.get('#modal-confirm').should('be.visible');
    cy.get('#confirm-action-message')
      .should('be.visible')
      .contains('Are you sure you want to delete Prospect 1?');
    cy.get('#confirm-action').should('be.visible');
    cy.get('#confirm-action').click();

    // check the URL
    cy.url().should('eq', 'http://localhost:3000/prospects/list');

    // check that the prospect still exists in the list
    // TODO: update check after prospect is deleted from DB
    cy.get('div[id="prospect-1"]').should('exist');
  })
});

