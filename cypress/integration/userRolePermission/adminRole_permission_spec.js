const loginPageObjs = require("../../page_objects/login.pageObjects");
const setupPageObjs = require("../../page_objects/setup.page");
const usernames = require("../../fixtures/userNames.json");
const creds = require("../../fixtures/credentials.json");
const testData = require("../../fixtures/rolePermission.json");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const assertionPage = require("../../page_objects/assertion.page");
const performancePage = require("../../page_objects/performance.page");
const vendorsPage = require("../../page_objects/vendors.page");
const orderPage = require("../../page_objects/order.page");
const priorityReportPage = require("../../page_objects/priorityReport.page");

let timeStamp = new Date().toISOString();
let createVendorName = testData.vendorName + timeStamp;
let createEmail = testData.email;
const newInvoiceNum = testData.invoiceNum + timeStamp;
const newCustomerName = testData.customerName;
const newItemCode = testData.itemCode + timeStamp;
const newVendorItem = testData.vendorItem + timeStamp;

const urlToHit = process.env.npm_config_url || "http://localhost:8080/";
console.log("Running against: " + urlToHit);

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

beforeEach(() => {
    // open the application and verify elements from Login page
    cy.visit(urlToHit);
    loginPageObjs.verifyLoginPageElement();
    // login as admin 
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
});

afterEach(() => {
    // logout from application
    loginPageObjs.logout();
});

describe('Role Permission Verification for Admin', () => {
    it('verify Home page', () => {
        loginPageObjs.chooseTenant(testData.tenantName);
        // check Nightly Sales data checkbox
        setupPageObjs.enableFlagForSalesAndCustomReports();
        // chek settings and 
        loginPageObjs.checkPasswordChangeAndSettings();
        // go to home
        hamburgerMenuPageObj.goToHome();
        // verify elements from Home page
        loginPageObjs.verifyHomePage();
    });

    it('verify Order Page', () => {
        // go to order page
        hamburgerMenuPageObj.goToOrders();
        // view order
        orderPage.viewOrder();
        // view inbox
        orderPage.viewInbox();
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
    });

    it("Complete initial review", () => {
        // go to order page
        hamburgerMenuPageObj.goToOrders();
        // attach and upload invoice
        orderPage.attachInvoice();
        // end preprocessing
        orderPage.endPreProcessing();
        //go to Priority Report
        hamburgerMenuPageObj.goToPriorityReport();
        cy.wait(10000);
        //start the bulk IR
        priorityReportPage.startIR(testData.tenantName);
        // complete initial Review
        orderPage.irProcessWithTenantCheck(testData.tenantName, newInvoiceNum, newCustomerName);
    });

    it("Complete the Reconciallations", () => {
        hamburgerMenuPageObj.goToOrders();
        // reconcile order
        orderPage.changeStatusToInReconciliation();
        orderPage.ReconcialltionProcessWithTenantCheck(testData.tenantName, newInvoiceNum, newCustomerName);
    });

    it("Complete the Final Review", () => {
        hamburgerMenuPageObj.goToOrders();
        orderPage.changeStatusToFinalReview();
        // delete pending Reconciliation
        orderPage.deletePendingReconciliation();
        // goto retired order
        orderPage.changeStatusToRetiredOrder();
        // undelete Order
        orderPage.undeleteOrder();
        orderPage.changeStatusToFinalReview();
        // add line item in the final Review
        orderPage.finalReviewProcess(newItemCode, newVendorItem, "2oz Souffle Cup Lid");
        orderPage.changeStatusToAccountManagerReview();
        // solve questions regarding vendor item
        orderPage.resolveQuestionsInAMReview();
    });

    it("Close the order", () => {
        hamburgerMenuPageObj.goToOrders();
        // delete closed order
        orderPage.changeStatusToClosed();
        orderPage.deleteClosedOrder(newInvoiceNum);
    });

    // check for all tabs on perf page
    it("Check Performance Budget Page", () => {
        // go to perf budget page and assert budget page
        hamburgerMenuPageObj.goToPerfBudget();
        assertionPage.verifyPerfBudgetPage();
    });

    it('check performance category page', () => {
        // go to perf category report page and assert category report page
        hamburgerMenuPageObj.goToPerformance();
        hamburgerMenuPageObj.goToCategoryReport();
        assertionPage.verifyPerfCategoryPage();
        performancePage.export();
    });

    it('check performance controllable P&L', () => {
        // go to perf Controllable P&L report page and assert Controllable P&L page
        hamburgerMenuPageObj.goToPerformance();
        hamburgerMenuPageObj.goToControllabelPL();
        assertionPage.verifyPerfControllablePL();
    });

    it('check performance custom report', () => {
        // go to perf custom reports page and assert custom report page
        hamburgerMenuPageObj.goToPerformance();
        hamburgerMenuPageObj.goToPerfCustomReports();
        assertionPage.verifyPerfCustomReports();
    });

    it('check performance food usage report', () => {
        // go to perf Food Usage report page and assert Food Usage page
        hamburgerMenuPageObj.goToPerformance();
        hamburgerMenuPageObj.goToFoodUsageReport();
        assertionPage.verifyPerfFoodUsage();
        performancePage.export();
    });

    it('check performance sales ', () => {
        // go to perf Sales page and assert sales page
        hamburgerMenuPageObj.goToPerformance();
        hamburgerMenuPageObj.goToSales();
        assertionPage.verifyPerfSales();
    });

    it('check performance price alert', () => {
        // go to perf Price Alert report page and assert price alert page
        hamburgerMenuPageObj.goToPerformance();
        hamburgerMenuPageObj.goToPriceAlert();
        assertionPage.verifyPerfPriceAlert();
        performancePage.export();
    });

    it('check performance price movers', () => {
        // go to perf Price Movers report page and assert movers alert page
        hamburgerMenuPageObj.goToPerformance();
        hamburgerMenuPageObj.goToPriceMovers();
        assertionPage.verifyPerfPriceMovers();
        performancePage.export();
    });

    it('check performance theoretical food usage report', () => {
        // go to perf Usage report page and assert Usage alert page
        hamburgerMenuPageObj.goToPerformance();
        hamburgerMenuPageObj.goToFoodUsage();
        assertionPage.verifyPerfTheorUsage();
        performancePage.export();
    });

    it("Check Vendor Page", () => {
        // go to vendor page
        hamburgerMenuPageObj.goToVendor();
        // check view access
        vendorsPage.viewVendors();
        // check configure defaults
        vendorsPage.configureDefaults();
        // check download feature
        vendorsPage.download();
        // create new vendor
        vendorsPage.createVendor(createVendorName, createEmail);
        // select the new vendor
        vendorsPage.selectVendor(createVendorName);
        // edit and delete the newly created vendor
        vendorsPage.editAndDeleteVendor();
        vendorsPage.selectVendor("Arrow");
        // click order guide setup
        vendorsPage.configureOrderGuide();
        // click manage Items for all restaurants
        vendorsPage.multiUnitOrderGuideSetup();
    });
});
