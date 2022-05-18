const loginPageObjs = require("../../page_objects/login.pageObjects");
const usernames = require("../../fixtures/userNames.json");
const creds = require("../../fixtures/credentials.json");
const setupPageObjs = require("../../page_objects/setup.page");
const testData = require("../../fixtures/rolePermission.json");
const loginPageObjects = require("../../page_objects/login.pageObjects");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const orderPageObj = require("../../page_objects/order.page");
const assertionPage = require("../../page_objects/assertion.page");
const vendorsPage = require("../../page_objects/vendors.page");
const vendorItemPage = require("../../page_objects/vendorItems.page");
const productPage = require("../../page_objects/product.page");
const menutemPage = require("../../page_objects/menutem.page");
const recipeSetupPage = require("../../page_objects/recipeSetup.page");
const priceAlertPageObj = require("../../page_objects/priceAlert.page");
const headerPageObj = require("../../page_objects/header.pageObj");

const urlToHit = "https://me-16624.marginedge.com/#/";

console.log("Running against: " + urlToHit);

beforeEach(() => {
    // open the application and verify elements from Login page
    cy.visit(urlToHit);
    loginPageObjs.verifyLoginPageElement();
    console.log("here1");
    console.log("here1000");
    
});

afterEach(() => {
    // logout from application
    loginPageObjs.logout();
    cy.wait(2000);
});

describe('POC', () => {
    it("Login as Admin, Select Existing Order, Edit and Save", () => {
        console.log("here5000");
        loginPageObjs.loginAs(creds.adminName, creds.password);
        cy.wait(3000);
        //go to price alert
        hamburgerMenuPageObj.goToOrders();
        //create priceAlert
        cy.wait(2000);
        orderPageObj.searchOrderFR();
        orderPageObj.editInvoiceNumber();
        orderPageObj.saveInvoiceNumber();
    });
    it("Login as Admin, Select Existing Order, delete Order", () => {
        console.log("here6000");
        loginPageObjs.loginAs(creds.adminName, creds.password);
        cy.wait(3000);
        //go to price alert
        hamburgerMenuPageObj.goToOrders();
        //create priceAlert
        cy.wait(2000);
        orderPageObj.searchOrderFR();
        orderPageObj.deleteInvoice();
    });
    it("Login as Admin, Select Existing Order, delete Order doesn't exist", () => {
        console.log("here6000");
        loginPageObjs.loginAs(creds.adminName, creds.password);
        cy.wait(3000);
        //go to price alert
        hamburgerMenuPageObj.goToOrders();
        //create priceAlert
        cy.wait(2000);
        orderPageObj.orderNotExist();
        console.log('Complete');
    });
    
});
