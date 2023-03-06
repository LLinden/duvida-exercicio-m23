/// <reference types="cypress" />

class Home {
  selecionaLupa() {
    cy.get(".site-header .search-form > button").click();
  }
}
export default new Home();
