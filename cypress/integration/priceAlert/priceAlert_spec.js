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

const urlToHit = "https://me-16624.marginedge.com/#/";

console.log("Running against: " + urlToHit);

beforeEach(() => {
    // open the application and verify elements from Login page
    cy.visit(urlToHit);
    loginPageObjs.verifyLoginPageElement();
    console.log("here1");
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
    console.log("here1000");
    cy.wait(10000);

});

afterEach(() => {
    // logout from application
    loginPageObjs.logout();
    cy.wait(2000);
});

describe('Price Alert', () => {
    it("Login as Manager, Set an Email", () => {
        loginPageObjs.loginAs(creds.manager, creds.password);
        //go to price alert
        headerPageObj.settingDetails();
        //create priceAlert        
        cy.wait(2000);
    });
    it("Create price alert", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        //go to price alert
        hamburgerMenuPageObj.goToPriceAlert();
        //create priceAlert
        priceAlertPageObj.createPriceAlert();
        
        cy.wait(2000);
    });
    it("Edit Price Alert", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        //go to price alert
        hamburgerMenuPageObj.goToPriceAlert();
        //edit priceAlert
        priceAlertPageObj.editPriceAlert();
        cy.wait(4000);

    });
    it("Delete price alert", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        console.log("here2");
        //go to price alert
        hamburgerMenuPageObj.goToPriceAlert();
        console.log("here3");
        //edit priceAlert
        cy.wait(4000);
        priceAlertPageObj.deletePriceAlert();
        console.log("here4");
        console.log("here4");

    });
   it("Place New Order", () => {
       
        console.log("here22");
        hamburgerMenuPageObj.goToOrders();
        console.log("here23");
        orderPage.viewOrder();
        orderPage.attachInvoice();
        cy.wait(1000);
        orderPage.endPreProcessing();
        console.log("here243");
        orderPage.initialReview();
        console.log("here253");
        orderPage.reconcialltionProcess();
        orderPage.finalReview();

    });
    it.only("POC", () => {
        cy.wait(5000);
        console.log("here22");
        loginPageObjs.chooseTenant(testData.tenantName);
        hamburgerMenuPageObj.goToOrders();
        console.log("here23");
        orderPage.viewOrder();
        orderPage.attachInvoice();
        cy.wait(1000);
        orderPage.endPreProcessing();
        console.log("here243");
        orderPage.initialReview();
        console.log("here253");
        orderPage.reconcialltionProcess();
        console.log("tg 11.11");
        orderPage.finalReviewProcessOrder();

    });
    /* it("Order",()=>{
        //Choose Tenant
        console.log("tenant");
        loginPageObjs.chooseTenant(testData.tenantName);
        // go to order page
        hamburgerMenuPageObj.goToOrders();
        console.log("tenant2");
        // view order
        orderPage.viewOrder();
        console.log("tenant3");
        // view inbox
        orderPage.viewInbox();
        console.log("tenant4");
        // send order
        hamburgerMenuPageObj.goToPlaceOrders();
        orderPage.placeOrder();
        // change status to all
        orderPage.changeStatusToSent();
        // resend order
        orderPage.resendOrder();
        // delete order
        orderPage.deleteOrderInv();
        // save order
        hamburgerMenuPageObj.goToPlaceOrders();
        orderPage.saveOrder();
        orderPage.changeStatusToSaved();
        // delete saved order
        orderPage.deleteOrderInv();
    }); */
    
    
});
