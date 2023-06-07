import { 
  checkProspectsAreVisible, 
  prospect1,
  validateEmailFormat
} from '../../lib/helper.js'

describe('List prospects', () => {
  before(() => {
      cy.task('db:seedProspects')
    }
  )
  it('Should not have permissions when not logged in', () => {
    cy.visit('http://localhost:3000/prospects/list')

    cy.contains(prospect1).should('not.exist')
    cy.contains('Welcome to SalesWell')
  })

  it('Should have permissions when logged in as user', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/prospects/list')

    //only prospects 1-10 should be displayed
    checkProspectsAreVisible()
    cy.contains('Prospect 11').should('not.exist')
    cy.contains('Welcome to SalesWell').should('not.exist')
    cy.contains('No prospects!').should('not.exist')
  })

  it('Should have permissions when logged in as admin', () => {
    cy.login('admin@example.com', 'password')
    cy.visit('http://localhost:3000/prospects/list')

    //only prospects 1-10 should be displayed
    checkProspectsAreVisible()
    cy.contains('Prospect 11').should('not.exist')
    cy.contains('Welcome to SalesWell').should('not.exist')
    cy.contains('No prospects!').should('not.exist')
  })

  it('Should display many prospects on scrolling down', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/prospects/list')
    
    checkProspectsAreVisible()
    cy.contains('Prospect 11').should('not.exist')
    cy.scrollTo('bottom')
    
    //should be displayed prospects 1-20 on first scroll
    checkProspectsAreVisible()
    cy.contains("Prospect 11")
    cy.contains("Prospect 20")
    cy.scrollTo('bottom')
    cy.contains('Nothing more to show')
  })
})

describe('Create prospect', () => {
  it('Should have permissions when logged in as user', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/prospects/list')

    // open the slide pane to create a prospect
    cy.get('button[id="create-prospect"').click()

    // fill the text fields for email, name, and phone
    cy.get('input[id="mail"]').click().type('test@wellcode.com')
    cy.get('input[id="name"]').click().type('test name')
    cy.get('input[id="phone"]').click().type('0707070707')

    // create a new prospect and check for success message
    cy.get('button[id="create"').click()
    cy.contains('Prospect successfully created!')

    // check if the user is directed to the newly created prospect
    cy.url().should('eq', 'http://localhost:3000/prospects/profile/21')
    cy.contains('test@wellcode.com')
    cy.contains("Notes")

    // should go to the prospects list and scroll all the way down 3 times
    // to check if the newly created prospect appears in the list
    cy.contains('Prospects').click()
    cy.url().should('eq', 'http://localhost:3000/prospects/list')
    cy.scrollTo('bottom').contains('Prospect 10')
    cy.scrollTo('bottom').contains('Prospect 20')

    // the newly created prospect
    cy.scrollTo('bottom').contains('test name')
    cy.contains('test@wellcode.com')
  })

  it('Should not create a prospect with existing email', () => {
    cy.login('admin@example.com', 'password')
    cy.visit('http://localhost:3000/prospects/list')

    // open the slide pane to create a prospect
    cy.get('button[id="create-prospect"').click()

    // fill the text fields for email, name, and phone
    cy.get('input[id="mail"]').click().type('test@wellcode.com')
    cy.get('input[id="name"]').click().type('test name')
    cy.get('input[id="phone"]').click().type('0700000000')

    // try to create a new prospect and check for error message
    cy.get('button[id="create"').click()
    cy.contains('Email is already in use!')
  })

  it('Should not create a prospect with invalid email address', () => {
    cy.login('admin@example.com', 'password')
    cy.visit('http://localhost:3000/prospects/list')

    // open the slide pane to create a prospect
    cy.get('button[id="create-prospect"').click()

    // fill the text fields for name and phone number
    cy.get('input[id="name"]').click().type('test name')
    cy.get('input[id="phone"]').click().type('0777777777')

    // the individual (local) part of an email address may consist only of the 
    // ASCII standard characters. The dot however, cannot be the initial or 
    // final character, or cannot be used in succession.
    validateEmailFormat('.test@wellcode.com')
    validateEmailFormat('test.@wellcode.com')
    validateEmailFormat('te..st@wellcode.com')

    // the domain name part comprises of the following characters: 
    // digits (0 - 9), lowercase and uppercase Latin letters (a - z and A - Z), 
    // hyphen or dot (– or .), as long as they are not the initial 
    // or final characters.
    validateEmailFormat('test@.wellcode.com')
    validateEmailFormat('test@wellcode..com')
    validateEmailFormat('test@-wellcode.com')
    validateEmailFormat('test@wellcode-.com')

    // other ASCII printable characters
    validateEmailFormat('test@!#$%&*+/=?^_`{|}~.com')
  })

  it('Should not create a prospect with existing phone number', () => {
    cy.login('admin@example.com', 'password')
    cy.visit('http://localhost:3000/prospects/list')

    // open the slide pane to create a prospect
    cy.get('button[id="create-prospect"').click()

    // fill the text fields for email, name, and phone
    cy.get('input[id="mail"]').click().type('test2@wellcode.com')
    cy.get('input[id="name"]').click().type('test name')
    cy.get('input[id="phone"]').click().type('0707070707')

    // try to create a new prospect and check for error message
    cy.get('button[id="create"').click()
    cy.contains('Phone number is already in use!')
  })

  it('Should not create a prospect with invalid phone number format', () => {
    cy.login('admin@example.com', 'password')
    cy.visit('http://localhost:3000/prospects/list')

    // open the slide pane to create a prospect
    cy.get('button[id="create-prospect"').click()

    // fill the text fields for email and name
    cy.get('input[id="mail"]').click().type('test2@wellcode.com')
    cy.get('input[id="name"]').click().type('test name')

    // should not have less than 10 digits
    cy.get('input[id="phone"]').click().type('12345')

    // try to create a new prospect and check for error message
    cy.get('button[id="create"').click()
    cy.contains('Invalid phone number format!')

    // should not have more than 10 digits
    cy.get('input[id="phone"]').click().type('678910')
    cy.get('button[id="create"').click()
    cy.contains('Invalid phone number format!')

    // should accept other phone prefix than '07'
    cy.get('input[id="phone"]').clear().type('0333333333')
    cy.get('button[id="create"').click()
    cy.contains('Prospect successfully created!')
  })

  it('Should not create a prospect with missing phone number or email', () => {
    cy.login('admin@example.com', 'password')
    cy.visit('http://localhost:3000/prospects/list')

    // open the slide pane to create a prospect
    cy.get('button[id="create-prospect"').click()

    // the create button should be disabled
    cy.get('button[id="create"').should('be.disabled')

    // fill only the text field for email
    cy.get('input[id="mail"]').click().type('test2@wellcode.com')
    cy.get('button[id="create"').should('be.disabled')

    // fill only the text field for phone number
    cy.get('input[id="mail"]').clear()
    cy.get('input[id="phone"]').click().type('0707070777')
    cy.get('button[id="create"').should('be.disabled')
  })
})

describe('Search prospect', () => {
  it('Should have permissions when logged in as user', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/prospects/list')

    // search prospect by email
    cy.get('input[id="search-bar"').click().type('test@wellcode.com')

    cy.contains('test name')
    cy.contains('test@wellcode.com')
    cy.contains('Prospect 1').should('not.exist')

    // search prospect by name
    cy.get('input[id="search-bar"').clear().click().type('test name')

    cy.contains('test name')
    cy.contains('test@wellcode.com')
    cy.contains('Prospect 1').should('not.exist')

    // search prospect by phone
    cy.get('input[id="search-bar"').clear().click().type('0707070707')

    cy.contains('test name')
    cy.contains('test@wellcode.com')
    cy.contains('Prospect 1').should('not.exist')
  })

  it('Should display all prospects that match the search by name', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/prospects/list')

    // search prospect by name
    cy.get('input[id="search-bar"').click().type('Prospect')

    cy.contains('Prospect 1')
    cy.scrollTo('bottom').contains('Prospect 10')
    cy.scrollTo('bottom').contains('Prospect 20')
  })

  it('Should display all prospects that match the search by email', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/prospects/list')

    // search prospect by email
    cy.get('input[id="search-bar"').click().type('booking1')

    cy.contains('Prospect 1')
    cy.contains('booking1@gmail.com')
    cy.scrollTo('bottom').scrollTo('bottom').contains('Prospect 19')
    cy.contains('booking19@gmail.com')
  })

  it('Should display all prospects that match the search by phone', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/prospects/list')

    // search prospect by phone number
    cy.get('input[id="search-bar"').click().type('07777')

    cy.contains('Prospect 1')
    cy.scrollTo('bottom').contains('Prospect 10')
    cy.scrollTo('bottom').contains('Prospect 20')
  })

  it('Should search in case insensitive', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/prospects/list')

    // search prospect by name
    cy.get('input[id="search-bar"').click().type('proSPecT 12')

    cy.contains('Prospect 12')
    cy.contains('booking12@gmail.com')
    cy.contains('077777777')

    // search prospect by email
    cy.get('input[id="search-bar"').clear()
    cy.get('input[id="search-bar"').click().type('BOOKing4@Gmail.com')

    cy.contains('Prospect 4')
    cy.contains('booking4@gmail.com')
    cy.contains('077777777')
  })

  it('Should display message if no search results', () => {
    cy.login('normal@example.com', 'password')
    cy.visit('http://localhost:3000/prospects/list')

    // search a non existing prospect by name
    cy.get('input[id="search-bar"').click()
      .type('non existing name{enter}')

    cy.contains('No results!')

    // search a non existing prospect by email
    cy.get('input[id="search-bar"').clear()
    cy.get('input[id="search-bar"').click()
      .type('non_existing@email.com{enter}')

    cy.contains('No results!')

    // search a non existing prospect by phone
    cy.get('input[id="search-bar"').clear()
    cy.get('input[id="search-bar"').click()
      .type('0000000000{enter}')

    cy.contains('No results!')
  })
})
