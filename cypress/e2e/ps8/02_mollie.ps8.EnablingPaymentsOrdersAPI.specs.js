/// <reference types="Cypress" />

//Checking the console for errors
let windowConsoleError;
Cypress.on('window:before:load', (win) => {
  windowConsoleError = cy.spy(win.console, 'error');
})
let failEarly = false;
afterEach(() => {
  expect(windowConsoleError).to.not.be.called;
  if (failEarly) throw new Error("Failing Early due to an API or other module configuration problem. If running on CI, please check Cypress VIDEOS/SCREENSHOTS in the Artifacts for more details.")
})
afterEach(function() {
  if (this.currentTest.state === "failed") failEarly = true
});
describe('PS8 Enabling Payments', () => {
  beforeEach(() => {
      cy.viewport(1920,1080)
      cy.CachingBOFOPS8()
  })
it('C339341: 04 Enabling All payments in Module BO [Orders API]', () => {
    cy.visit('/admin1/')
    cy.OpeningModuleDashboardURL()
    cy.ConfOrdersAPI1784()
    cy.get('[type="submit"]').first().click({force:true})
    cy.get('[class="alert alert-success"]').should('be.visible')
    cy.reload()
    cy.matchImage(); // let's make a snapshot for visual regression testing later, if UI matches
})
})
