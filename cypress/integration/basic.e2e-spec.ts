describe(`Demo E2E with Cypress`, () => {
  beforeEach(() => {
    // using cy.visit(``) with an empty string will here try to load "http://localhost:4200"
    // this is because I've set this address within cypress.json
    cy.visit(``);
  });

  it(`should check that sidenav can be closed/opened`, () => {
    cy.get(`mat-sidenav`).should('be.visible');
    cy.get(`mat-toolbar button`).click();
    cy.get(`mat-sidenav`).should('not.be.visible');

    cy.get(`mat-toolbar button`).click();
    cy.get(`mat-sidenav`).should('be.visible');
  });
});
