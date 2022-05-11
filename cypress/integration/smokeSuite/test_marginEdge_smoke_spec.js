const loginPageObjs = require("../../page_objects/login.pageObjects");
const creds = require("../../fixtures/credentials.json");
const sanityTestData = require("../../fixtures/testData_Sanity.json")
const utilObj = require("../../utils/util_smoke");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const conceptPageObj = require("../../page_objects/concept.page");
const restaurantPageObj = require("../../page_objects/restaurant.page");
const orderPageObj = require("../../page_objects/order.page");
const vendorPageObj = require("../../page_objects/vendors.page");
const categoryPageObj = require("../../page_objects/categories.page");
const productPageObj = require("../../page_objects/product.page");
const vendorItemPageObj = require("../../page_objects/vendorItems.page");
const priorityReportPage = require("../../page_objects/priorityReport.page");
const inviteUserPage = require("../../page_objects/inviteUser.page");
const intacctPageObj = require("../../page_objects/integrationIntacct.page");
const vendorMappingPage = require("../../page_objects/vendorMapping.page");
const paymentMapPage = require("../../page_objects/paymentMap.page");
const exportPage = require("../../page_objects/export.page");

let timeStamp = new Date().toISOString();
// creating global variable for test
let createConceptName = sanityTestData.conceptName + timeStamp;
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
let invoiceNumberStr2 = sanityTestData.invoiceNumber + utilObj.makeId();
let invoiceNumberStr3 = sanityTestData.invoiceNumber + utilObj.makeId();
let itemCode = sanityTestData.itemCode + utilObj.makeId();
let lineItemVI = sanityTestData.itemCode + utilObj.makeId();
let itemCode2 = sanityTestData.itemCode + utilObj.makeId();
let lineItemVI2 = sanityTestData.itemCode + utilObj.makeId();
let itemCode3 = sanityTestData.itemCode + utilObj.makeId();
let lineItemVI3 = sanityTestData.itemCode + utilObj.makeId();

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
        // go to restaurant
        hamburgerMenuPageObj.goToRestaurant();
        // create restaurant
        restaurantPageObj.createRestaurant(createConceptName, 'Wasabi Sushi Co', createRestName, emailID, loginID, firstName, lastName);
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

    it("Login as Lead Analyst , Add Line Item and assign it to restaurant admin", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        // go to Orders
        hamburgerMenuPageObj.goToOrders();
        // start the Final Review
        orderPageObj.searchOrder(invoiceNumberStr);
        orderPageObj.finalReviewProcessRestAdmin(itemCode, lineItemVI, productName);
        // open the order and assign to the restaurant admin
        orderPageObj.searchOrderFR();
        orderPageObj.assignToRestaurantAdmin();
    });

    it("Login as Unit Admin , Approve the Invoice", () => {
        loginPageObjs.loginAs(creds.unitAdmin, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        // open the bell icon
        hamburgerMenuPageObj.goToNewVendorItemsBellIcon();
        // approve item
        hamburgerMenuPageObj.approveItem();
    });

    it("Login as Lead Analyst, Complete the Final Review", () => {
        loginPageObjs.loginAs(creds.leadAnalyst, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        //go to Orders
        hamburgerMenuPageObj.goToOrders();
        //start the Final Review
        orderPageObj.searchOrder(invoiceNumberStr);
        orderPageObj.finalReviewProcess(itemCode2, lineItemVI2, productName);
    });

    it("Login as Account Manager , Close the Order", () => {
        loginPageObjs.loginAs(creds.accountManager, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        // go to Orders
        hamburgerMenuPageObj.goToOrders();
        // start the Final Review
        orderPageObj.searchOrder(invoiceNumberStr);
        orderPageObj.closeOrderAfterApprovingInvoice();
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

    it("Login as Admin, Place new order through Orders and cancel preproceesing", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        // go to place new order
        hamburgerMenuPageObj.goToPlaceOrders();
        // place new order
        orderPageObj.placeNewOrder(createVendorName);
        // upload invoice to the order
        orderPageObj.searchOrder(createVendorName);
        orderPageObj.attachPhoto();
        //cancel Preprocessing
        orderPageObj.cancelPreProcessing();
    });

    it("Login as Lead Analyst, Complete the Initial Review and Reconciallations", () => {
        loginPageObjs.loginAs(creds.leadAnalyst, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        // go to Order
        hamburgerMenuPageObj.goToOrders();
        orderPageObj.searchOrder(createVendorName);
        // complete the IR
        orderPageObj.irProcess(invoiceNumberStr2);
        orderPageObj.searchOrder(invoiceNumberStr2);
        //compete the Reconcialltion
        orderPageObj.completeReconWithChangeinProd(invoiceNumberStr2, itemCode3, lineItemVI3, productName);
    });

    it("Login as Analyst, Check the approvals", () => {
        loginPageObjs.loginAs(creds.analyst, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        // open the bell icon
        hamburgerMenuPageObj.goToNewPendingReconBellIcon();
    });

    it("Login as Admin, Upload Invoice and Cancel Preprocessing", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        //go to order
        hamburgerMenuPageObj.goToOrders();
        //upload invoice
        orderPageObj.attachInvoice();
        //cancel preprocessing
        orderPageObj.cancelPreProcessingForAdmin();
    });

    it("Login as Analyst, Ask Question", () => {
        loginPageObjs.loginAs(creds.analyst, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        // go to pending reconciallations
        hamburgerMenuPageObj.goToNewPendingReconBellIcon();
        // go to invoice
        hamburgerMenuPageObj.clickInv();
        // ask Questions
        orderPageObj.askQuestion();
    });

    it("Login as Lead Analyst, Assign the invoice to Managing Analyst", () => {
        loginPageObjs.loginAs(creds.leadAnalyst, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        // go to pending reconciallations
        hamburgerMenuPageObj.goToInvTaskItemsBellIcon();
        // assign to managing analyst
        hamburgerMenuPageObj.clickInv2();
        orderPageObj.assignToManagingAnalyst();
    });

    it("Login as Managing Analyst, Resolve Concerns", () => {
        loginPageObjs.loginAs(creds.managingAnalyst, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        // go to pending reconciallations
        hamburgerMenuPageObj.goToInvTaskItemsBellIcon();
        // resolve concern
        hamburgerMenuPageObj.clickInv2();
        hamburgerMenuPageObj.resolveConcern();
    });

    it("Login as Admin, Upload Invoice and Cancel Preprocessing - Credit", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        //go to order
        hamburgerMenuPageObj.goToOrders();
        //upload invoice
        orderPageObj.attachInvoice();
        //cancel preprocessing
        orderPageObj.cancelPreProcessingForAdmin();
    });

    it("Login as Admin, Complete IR, Recon and Close the order with Negative Credit", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        //go to order
        hamburgerMenuPageObj.goToOrders();
        //complete the IR
        orderPageObj.searchOrderFR(invoiceNumberStr);
        orderPageObj.irProcessWithTenantCheckAdmin(createRestName, "Credit");
        //complete the reconcillations
        orderPageObj.searchOrder("Credit");
        orderPageObj.ReconcialltionProcessWithTenantCheckAdmin(createRestName, invoiceNumberStr3);
        //close the order
        cy.wait(3000);
        orderPageObj.searchOrder(invoiceNumberStr3);
        orderPageObj.closeOrderCredit();
    });

    it("Login as Admin , Connect to Intacct", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        //go to integration
        hamburgerMenuPageObj.goToIntegration();
        //connect to intacct
        intacctPageObj.connectToIntacct();
    });

    it("Login as Admin , Map Vendor, Category and Payment then Export", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        //go to category and map
        hamburgerMenuPageObj.goToCategories();
        categoryPageObj.mapCategory();
        //go to vendor mapping and map
        hamburgerMenuPageObj.goToVendorMapping();
        vendorMappingPage.mapVendor();
        //check user role
        hamburgerMenuPageObj.goToUsers();
        inviteUserPage.changeRole();
        //map payment method
        hamburgerMenuPageObj.goToPaymentMapping();
        paymentMapPage.paymentMapping();
        //go to export and check
        hamburgerMenuPageObj.goToExports();
        exportPage.exportInv(invoiceNumberStr);
        //observe report status and take screenshot
        exportPage.observeReport();
        //check category report
        hamburgerMenuPageObj.goToCetgoryReportFromPerf();
        cy.wait(5000);
    });

    it("Login as Admin , Edit and Delete Category", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        //go to category and delete
        hamburgerMenuPageObj.goToCategories();
        categoryPageObj.searchCategoryAndDelete();
    });
});