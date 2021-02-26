describe('Basic Form App', () => {

  // before each test we navigate to http://localhost:3000
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('sanity checks', () => {
    expect(5).to.equal(5)
    expect(1 + 2).to.equal(3)
    expect({}).to.eql({})
    expect({}).to.not.equal({})
  })

  // creating variables that grab the element to be tested
  const firstNameInput = () => cy.get('input[name=first_name]')
  const lastNameInput = () => cy.get('input[name=last_name]')
  const emailInput = () => cy.get('input[name=email]')
  const passInput= () => cy.get('input[name=password]')
  const tosCheckbox = () => cy.get('input[name=tos]')
  const submitBtn = () => cy.get('#submitBtn')

  it('the elements exist', () => {
    firstNameInput().should('exist')
    lastNameInput().should('exist')
    emailInput().should('exist')
    passInput().should('exist')
    tosCheckbox().should('exist')
    submitBtn().should('exist')
  })

  describe('Filling out inputs', () => {
    it('can input first and last name', () => {
      firstNameInput()
        .should('have.value', '')
        .type('Allison')
        .should('have.value', 'Allison')

      lastNameInput()
        .should('have.value', '')
        .type('Phillips')
        .should('have.value', 'Phillips')
    })

    it('can input email', () => {
      emailInput()
        .should('have.value', '')
        .type('aphillips@email.com')
        .should('have.value', 'aphillips@email.com') 
    })

    it('can input password', () => {
      passInput()
        .should('have.value', '')
        .type('abc123')
        .should('have.value', 'abc123')
    })

    it('can check agree to TOS', () => {
      tosCheckbox().check()
    })
  })

  describe('Submitting a form', () => {
    it('can submit a form', () => {
      firstNameInput().type('Allison')
      lastNameInput().type('Phillips')
      emailInput().type('aphillips@email.com')
      passInput().type('abc123')
      tosCheckbox().check()
      submitBtn().click()
    })

    it("submit button is disabled if form isn't complete", () => {
      submitBtn().should('be.disabled')
      firstNameInput().type('Allison')
      lastNameInput().type('Phillips')
      emailInput().type('aphillips@email.com')
      passInput().type('abc123')
      tosCheckbox().check()
      tosCheckbox().uncheck()
      submitBtn().should('be.disabled')
    })
  })

})