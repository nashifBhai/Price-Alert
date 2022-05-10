const loginPageObjs = require("../../page_objects/login.pageObjects");
const usernames = require("../../fixtures/userNames.json");
const creds = require("../../fixtures/credentials.json");

const urlToHit = process.env.npm_config_url || "http://localhost:8080/";
console.log("Running against: " + urlToHit);

beforeEach(() => {
    //open the application and verify elements
    cy.visit(urlToHit);
    loginPageObjs.verifyLoginPageElement();
});

afterEach(() => {
    //logout from app
    loginPageObjs.logout();
});

describe("Login for All Roles", () => {
    it("Pre-SignIn Verification, Login As Developer", () => {
        //login as
        loginPageObjs.loginAs(usernames.developerUN, creds.password);
        //check for the 1st header
        loginPageObjs.element.dashboardElement().should("exist");
    });

    it("Pre-SignIn Verification, Login As Admin", () => {
        //login as
        loginPageObjs.loginAs(usernames.adminUN, creds.password);
        //check for the 1st header
        loginPageObjs.element.dashboardElement().should("exist");
    });

    it("Pre-SignIn Verification, Login As Account Manager", () => {
        //login as
        loginPageObjs.loginAs(usernames.accountManagerUN, creds.password);
        //check for the 1st header
        loginPageObjs.element.dashboardElement().should("exist");
    });

    it("Pre-SignIn Verification, Login As Managing Analyst", () => {
        //login as
        loginPageObjs.loginAs(usernames.managinganalystUN, creds.password);
        //check for the 1st header
        loginPageObjs.element.dashboardElement().should("exist");
    });

    it("Pre-SignIn Verification, Login As Lead Analyst", () => {
        //login as
        loginPageObjs.loginAs(usernames.leadanalystUN, creds.password);
        //check for the 1st header
        loginPageObjs.element.dashboardElement().should("exist");
    });

    it("Pre-SignIn Verification, Login As Analyst", () => {
        //login as
        loginPageObjs.loginAs(usernames.analystUN, creds.password);
        //check for the 1st header
        loginPageObjs.element.dashboardElement().should("exist");
    });

    it("Pre-SignIn Verification, Login As User", () => {
        //login as
        loginPageObjs.loginAs(usernames.userUN, creds.password);
        //check for the 1st header
        loginPageObjs.element.dashboardElement().should("exist");
    });

    it("Pre-SignIn Verification, Login As Manager", () => {
        //login as
        loginPageObjs.loginAs(usernames.managerUN, creds.password);
        //check for the 1st header
        loginPageObjs.element.dashboardElement().should("exist");
    });

    it("Pre-SignIn Verification, Login As Accountant", () => {
        //login as
        loginPageObjs.loginAs(usernames.accountantUN, creds.password);
        //check for the 1st header
        loginPageObjs.element.dashboardElement().should("exist");
    });

    it("Pre-SignIn Verification, Login As Unit Admin", () => {
        //login as
        loginPageObjs.loginAs(usernames.unitadminUN, creds.password);
        //check for the 1st header
        loginPageObjs.element.dashboardElement().should("exist");
    });

    it("Pre-SignIn Verification, Login As MarginEdge Admin", () => {
        //login as
        loginPageObjs.loginAs(usernames.marginedgeAdminUN, creds.password);
        //check for the 1st header
        loginPageObjs.element.dashboardElement().should("exist");
    });

    it("Pre-SignIn Verification, Login As Payroll Manager", () => {
        //login as
        loginPageObjs.loginAs(usernames.payrollManagerUN, creds.password);
        //check for the 1st header
        loginPageObjs.element.dashboardElement().should("exist");
    });

    it("Pre-SignIn Verification, Login As Bill Pay User", () => {
        //login as
        loginPageObjs.loginAs(usernames.billpayuserUN, creds.password);
        //check for the 1st header
        loginPageObjs.element.dashboardElement().should("exist");
    });

    it("Pre-SignIn Verification, Login As Associate Accountant", () => {
        //login as
        loginPageObjs.loginAs(usernames.assAccUN, creds.password);
        //check for the 1st header
        loginPageObjs.element.dashboardElement().should("exist");
    });

    it("Pre-SignIn Verification, Login As Shift Reviewer", () => {
        //login as
        loginPageObjs.loginAs(usernames.shiftRevieweUN, creds.password);
        //check for the 1st header
        loginPageObjs.element.dashboardElement().should("exist");
    });
});