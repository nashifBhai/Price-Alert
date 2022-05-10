const loginPageObjs = require("../../page_objects/login.pageObjects");
const creds = require("../../fixtures/credentials.json");
const sanityTestData = require("../../fixtures/testData_Sanity.json")
const utilObj = require("../../utils/util_smoke");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const conceptPageObj = require("../../page_objects/concept.page");
const companyPageObj = require("../../page_objects/companies.page");
const restaurantPageObj = require("../../page_objects/restaurant.page");
const orderPageObj = require("../../page_objects/order.page");
const vendorPageObj = require("../../page_objects/vendors.page");
const categoryPageObj = require("../../page_objects/categories.page");
const productPageObj = require("../../page_objects/product.page");
const vendorItemPageObj = require("../../page_objects/vendorItems.page");
const priorityReportPage = require("../../page_objects/priorityReport.page");
const inviteUserPage = require("../../page_objects/inviteUser.page");

let timeStamp = new Date().toISOString();
// creating global variable for test
let createCompanyName = sanityTestData.companyName + timeStamp;
let createConceptName = sanityTestData.conceptName + timeStamp;
let createZenDeskID = sanityTestData.zendeskID + timeStamp;
export const createRestName = sanityTestData.restaurant + timeStamp;
export const countSheetName = sanityTestData.CountSheetName + utilObj.makeId();
let emailID = "test" + utilObj.makeId() + "@gmail.com";
let loginID = "test" + utilObj.makeId().toLowerCase();
let firstName = "Prashant" + utilObj.makeId().toLowerCase();
let lastName = "Sinha" + utilObj.makeId().toLowerCase();
let createVendorName = sanityTestData.vendorName + timeStamp;
let productName = sanityTestData.productName + utilObj.makeId();
let vendorItemName = sanityTestData.VIName + utilObj.makeId();
let invoiceNumberStr = sanityTestData.invoiceNumber + utilObj.makeId();
let customerNameStr = sanityTestData.customerName + utilObj.makeId();

const urlToHit = process.env.npm_config_url || "http://localhost:8080/";
console.log("Running against: " + urlToHit);

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

beforeEach(() => {
    // open the application and verify elements
    cy.visit(urlToHit);
    loginPageObjs.verifyLoginPageElement();
});

afterEach(() => {
    // logout from app
    loginPageObjs.logout();
});

describe("Smoke Spec - Orders Scenarios", () => {
    it("Pre-SignIn Verification, Login As Admin", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
    });

    it("Create Concept,Companies and Restaurant", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        // go to concept
        hamburgerMenuPageObj.goToConcept();
        // create concept
        conceptPageObj.createConcept(createConceptName);
        conceptPageObj.element.searchBtn().type(createConceptName);
        conceptPageObj.element.assertionList().should("be.visible");
        // goTo Company Page
        hamburgerMenuPageObj.goToCompanies();
        // create Company
        companyPageObj.createCompany(createCompanyName, createZenDeskID);
        conceptPageObj.element.searchBtn().type(createCompanyName).should("be.visible");
        // go to restaurant
        hamburgerMenuPageObj.goToRestaurant();
        // create restaurant
        restaurantPageObj.createRestaurant(createConceptName, createCompanyName, createRestName, emailID, loginID, firstName, lastName);
        // logout
        loginPageObjs.logout();
        // login and select the tenant
        loginPageObjs.loginAs(creds.adminName, creds.password);
        loginPageObjs.chooseTenant(createRestName);
        cy.wait(2000);
    });

    it("Create a Vendor", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        let emailIDV = "test" + utilObj.makeId() + "@gmail.com";
        utilObj.checkRestUnit(createRestName, createRestName);
        // go to vendors
        hamburgerMenuPageObj.goToVendor();
        // create new vendor
        vendorPageObj.createVendor(createVendorName, emailIDV); // add placing order in the flow
        vendorPageObj.element.filterSearch().type(createVendorName);
        // assert the created vendor
        vendorPageObj.element.assertionList().should("be.visible");
    });


    it("Import Category", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        // goto product page
        hamburgerMenuPageObj.goToCategories();
        // import
        categoryPageObj.importCategory();
    })

    it("Create Products", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        // goto product page
        hamburgerMenuPageObj.goToProduct();
        // create product
        productPageObj.createProduct(productName);
        productPageObj.element.searchBtn().type(productName);
        // assert the created product
        productPageObj.element.assertList().should("be.visible");
    });

    it("Create Vendor Items", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        // go to vendors
        hamburgerMenuPageObj.goToVendorItems();
        // create new vendor item
        vendorItemPageObj.createVI(createVendorName, vendorItemName, utilObj.makeId(), productName, "Test", "4", "40");
        vendorItemPageObj.element.searchValue().type(vendorItemName);
        // assert the created vendor items
        vendorItemPageObj.element.assertionList().should("be.visible");
    });

    it("Add UnitAdmin to the Restaurant", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        // go to Users
        hamburgerMenuPageObj.goToUsers();
        // invite User and Add to the Restaurant
        inviteUserPage.addUnitAdmin();
    });

    it("Login as UnitAdmin, Upload Invoice and Cancel Preprocessing as an Admin", () => {
        loginPageObjs.loginAs(creds.unitAdmin, creds.password);
        utilObj.checkRestUnitWO(createRestName);
        // go to order
        hamburgerMenuPageObj.goToOrders();
        // upload invoice
        orderPageObj.attachInvoice();
        loginPageObjs.logout();
        // login as admin and cancel preprocessing
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        hamburgerMenuPageObj.goToOrders();
        // select Invoice and cancel preprocessing
        orderPageObj.cancelPreProcessing();
    });

    it("Login as Analyst 1, Complete the Initial Review", () => {
        loginPageObjs.loginAs(creds.accountManager, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        // go to Priority Report
        hamburgerMenuPageObj.goToPriorityReport();
        // start the IR
        cy.wait(10000);
        priorityReportPage.startIR(createRestName);
        // update the IR Form
        orderPageObj.irProcessWithTenantCheck(createRestName, invoiceNumberStr, customerNameStr);
        cy.wait(10000);
    });

    it("Login as Analyst 2, Complete the Reconciallations", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        // go to Priority Report
        hamburgerMenuPageObj.goToPriorityReport();
        // start the Reconcialltions
        priorityReportPage.startReconcillations(createRestName);
        // update the reconcialltion flow
        orderPageObj.ReconcialltionProcessWithTenantCheck(createRestName, invoiceNumberStr, customerNameStr);
    });

    it("Login as Manager and Place new order through Orders", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        // go to place new order
        hamburgerMenuPageObj.goToPlaceOrders();
        // place new order
        orderPageObj.placeNewOrder(createVendorName);
    });

    it("Place an order through Vendor", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        // go to vendors
        hamburgerMenuPageObj.goToVendor();
        // place new order
        vendorPageObj.placeNewOrder();
    });
});