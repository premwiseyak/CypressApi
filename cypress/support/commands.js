/// <reference types="cypress"/>

Cypress.Commands.add("login", () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/session',
      body: {
        username: 'superman',
        password: 'test1'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
  
      // Store the cookies in an alias
      cy.wrap(response.headers['set-cookie']).as('cookies');
    });
  });