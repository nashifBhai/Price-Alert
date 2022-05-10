class loginPage {
    element = {
        marginedgeLogo: () => cy.get('[ui-sref="login"]'),
        userNameInput: () => cy.get("#username"),
        passwordInput: () => cy.get("#password"),
        signInText: () => cy.xpath(`//h1[text()='Sign In:']`),
        loginText: () => cy.xpath(`//label[text()='Login']`),
        forgetPasswordLink: () => cy.xpath(`//*[@href="#/forgot"]`),
        signInBtn: () => cy.get("#signInBtn"),
        logoutDD: () => cy.xpath(`//button[@id='userNameDropdown']`),
        clickLogout: () => cy.xpath(`//a[@id='logoutBtn']`),
        storeToggle: () => cy.get('#unitMenu_dd'),
        search: () => cy.get(`#searchTenant`),
        selectTenant: () => cy.get(`#unitname`),
        dashboardElement: () => cy.xpath(`//*[@ng-controller="PurchasingReportController"]`),
        budgetDashboardElem: () => cy.xpath(`//*[@ng-controller="BudgetOverviewController"]`),
        topPriceMoverDashboardElem: () => cy.xpath(`//*[@heading="Top Price Movers"]//div[@class="panel panel-primary"]`),
        salesDashboardElement: () => cy.xpath(`//panel[@class='ng-scope ng-isolate-scope']//div[@class='panel panel-green']`),
    };

    verifyHomePageForUser() {
        this.element.dashboardElement().should("be.visible");
        this.element.budgetDashboardElem().should("be.visible");
        this.element.topPriceMoverDashboardElem().should("be.visible");
    }

    verifyHomePage() {
        this.element.dashboardElement().should("be.visible");
        this.element.budgetDashboardElem().should("be.visible");
        this.element.topPriceMoverDashboardElem().should("be.visible");
        this.element.salesDashboardElement().should("be.visible");
    }

    verifyLoginPageElement() {
        cy.wait(1000);
        this.element.marginedgeLogo().should("be.visible");
        this.element.userNameInput().should("be.visible");
        this.element.passwordInput().should("be.visible");
        this.element.signInText().should("be.visible");
        this.element.loginText().should("be.visible");
        this.element.forgetPasswordLink().should("be.visible");
        cy.wait(1000);

    }

    loginAs(username, password) {
        this.element.userNameInput().type(username);
        this.element.passwordInput().type(password);
        this.element.signInBtn().click();
    }

    logout() {
        cy.wait(5000);
        this.element.logoutDD().should('be.visible').click({ force: true });
        cy.wait(1000);
        this.element.clickLogout().should('be.visible').click({ force: true });
        cy.wait(1000);
        this.element.userNameInput().should('be.visible');
    }

    chooseTenant(tenant) {
        this.element.storeToggle().click();
        this.element.search().type(tenant);
        this.element.selectTenant().click();
        cy.wait(2000);
    }
}
module.exports = new loginPage();