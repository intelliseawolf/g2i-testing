/// <reference types="cypress" />
describe("Homepage", () => {
  it("contain text", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Welcome to the Trivia Challenge!");
    cy.contains("You will be presented with 10 True or False questions.");
    cy.contains("BEGIN");
  });

  it("check the redux store when click the True radio", () => {
    cy.visit("http://localhost:3000");
    cy.get("button").click({ force: true });
    cy.wait(1000);
    cy.get('[type="radio"]').check("True");
    cy.get("button").click({ force: true });
    cy.window()
      .its("store")
      .invoke("getState")
      .its("quiz.result")
      .should("deep.equal", [
        {
          id: 0,
          answer: "True",
        },
      ]);
  });

  it("check the store when click the True radio & click Next button & click Prev button & click False radio", () => {
    cy.visit("http://localhost:3000");
    cy.get("button").click({ force: true });
    cy.wait(1000);
    cy.get('[type="radio"]').check("True");
    cy.get("button").click({ force: true });
    cy.contains("Prev").click({ force: true });
    cy.get('[type="radio"]').check("False");
    cy.get("button").click({ force: true });
    cy.window()
      .its("store")
      .invoke("getState")
      .its("quiz.result")
      .should("deep.equal", [
        {
          id: 0,
          answer: "False",
        },
      ]);
  });

  it("the radios not be checked when click play again button", () => {
    cy.visit("http://localhost:3000");
    cy.get("button").click({ force: true });
    cy.wait(1000);

    for (let i = 0; i < 10; i++) {
      cy.click_true_radio();
    }

    cy.contains("PLAY AGAIN?").click({ force: true });
    cy.get('[type="radio"]').should("not.be.checked");
  });
});
