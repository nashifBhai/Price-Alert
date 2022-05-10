class assertionPage {
    element = {
        pageHeader: () => cy.get('h2.ng-scope'),
        kitchenDisplayPage: () => cy.xpath(`//h2[text()='Kitchen Display Application']`),
        contentCheck: () => cy.get(`#content`),
        recipeSetupPage: () => cy.xpath(`//h2[text()='Recipe Setup']`)
    };

    verifyPerfBudgetPage() {
        this.element.pageHeader().should('be.visible');
    }

    verifyPerfCategoryPage() {
        this.element.pageHeader().should('be.visible');
    }

    verifyPerfControllablePL() {
        this.element.pageHeader().should('be.visible');
    }

    verifyPerfFoodUsage() {
        this.element.pageHeader().should('be.visible');
    }

    verifyPerfSales() {
        this.element.pageHeader().should('be.visible');
    }

    verifyPerfPriceAlert() {
        this.element.pageHeader().should('be.visible');
    }

    verifyPerfPriceMovers() {
        this.element.pageHeader().should('be.visible');
    }

    verifyPerfTheorUsage() {
        this.element.pageHeader().should('be.visible');
    }

    verifyKitchenDisplayPage() {
        this.element.kitchenDisplayPage().should('be.visible');
    }

    checkContentDisplayed() {
        this.element.contentCheck().should('be.visible');
    }

    verifyRecipeSetupPage() {
        this.element.recipeSetupPage().should('be.visible');
    }
}
module.exports = new assertionPage();