const loginPageObjs = require("../../page_objects/login.pageObjects");
const usernames = require("../../fixtures/userNames.json");
const creds = require("../../fixtures/credentials.json");
const setupPageObjs = require("../../page_objects/setup.page");
const testData = require("../../fixtures/rolePermission.json");
const loginPageObjects = require("../../page_objects/login.pageObjects");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const orderPage = require("../../page_objects/order.page");
const assertionPage = require("../../page_objects/assertion.page");
const vendorsPage = require("../../page_objects/vendors.page");
const vendorItemPage = require("../../page_objects/vendorItems.page");
const productPage = require("../../page_objects/product.page");
const menutemPage = require("../../page_objects/menutem.page");
const recipeSetupPage = require("../../page_objects/recipeSetup.page");
const priceAlertPageObj = require("../../page_objects/priceAlert.page");
const headerPageObj = require("../../page_objects/header.pageObj");

const urlToHit = "https://me-15246.marginedge.com/#/";

console.log("Running against: " + urlToHit);

beforeEach(() => {
    // open the application and verify elements from Login page
    cy.visit(urlToHit);
    loginPageObjs.verifyLoginPageElement();
    cy.wait(10000);

});

afterEach(() => {
    // logout from application
    loginPageObjs.logout();
    cy.wait(2000);
});

describe('POC', () => {
    it.only("Login as Admin, Set an Email", () => {
        //go to orders
        loginPageObjs.loginAs(creds.manager, creds.password);
        headerPageObj.goToOrders();
        //create priceAlert        
        cy.wait(2000);
    });
    
});
