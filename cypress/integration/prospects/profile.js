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
})