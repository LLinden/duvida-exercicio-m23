/// <reference types="cypress" />

import homePage from "../support/pages/home.page";
import { productSearchPage } from "../support/pages/productSearch.page";
const data = require("../fixtures/data.json");

describe("Busca de produto", () => {
  before(() => {
    cy.intercept(
      {
        method: "GET",
        url: "/wp-admin/admin-ajax*",
        query: {
          term: "Jacket",
        },
      },
      (req) => {
        req.reply({
          statusCode: 200,
          body: `${req.query.callback}(
          ${JSON.stringify(data.autocompleteSearchData)}
            )`,
        });
      }
    );
  });

  beforeEach(() => {
    cy.visit("/");
  });

  it("autocomplete product should be return correctly", () => {
    homePage.selecionaLupa();
    productSearchPage.search("Jacket");
    productSearchPage.productList
      .first()
      .should("have.attr", "title", "EBAC Jacket");
  });
});
