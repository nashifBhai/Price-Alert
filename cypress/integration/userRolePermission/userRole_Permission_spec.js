const loginPageObjs = require("../../page_objects/login.pageObjects");
const usernames = require("../../fixtures/userNames.json");
const creds = require("../../fixtures/credentials.json");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const orderPage = require("../../page_objects/order.page");
const assertionPage = require("../../page_objects/assertion.page");
const vendorsPage = require("../../page_objects/vendors.page");
const vendorItemPage = require("../../page_objects/vendorItems.page");
const productPage = require("../../page_objects/product.page");
const menutemPage = require("../../page_objects/menutem.page");
const inventoryPageObj = require("../../page_objects/inventoriesRole.page");

const urlToHit = process.env.npm_config_url || "http://localhost:8080/";
console.log("Running against: " + urlToHit);

let timeStamp = new Date().toISOString();

export const countSheetName = "Test" + timeStamp;

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

beforeEach(() => {
    // open the application and verify elements
    cy.visit(urlToHit);
    loginPageObjs.verifyLoginPageElement();
    // login as
    loginPageObjs.loginAs(usernames.userUN, creds.password);
});

describe("Role Permission Verification for User", () => {
    it("Check Home Page", () => {
        // check for tabs on home page
        loginPageObjs.verifyHomePageForUser();
    });

    it("Check Order Page", () => {
        // go to order page
        hamburgerMenuPageObj.goToOrders();
        // view order
        orderPage.viewOrder();
        // check approve invoice
        orderPage.checkApproveInvoiceTab();
        // check edit access
        orderPage.checkForEdit();
        // place order
        hamburgerMenuPageObj.goToPlaceOrders();
        orderPage.placeOrder();
        // change status to all
        orderPage.changeStatusToSent();
        // resend order
        orderPage.resendOrder();
        // delete order
        orderPage.deleteOrderInv();
        //  attach and upload invoice
        orderPage.attachInvoice();
        // save order
        hamburgerMenuPageObj.goToPlaceOrders();
        orderPage.saveOrder();
        // delete saved order
        orderPage.changeStatusToSaved();
        orderPage.deleteOrderInv();
        // No access to delete closed order
        orderPage.changeStatusToClosed();
        orderPage.deleteOrderCheck();
        // goToSetupTranfer
        hamburgerMenuPageObj.goToOrderSetup();
        orderPage.checkInitailTransfer();
    });

    it("Check Performance Page", () => {
        // check for all tabs on perf page
        // go to perf budget page and assert budget page
        hamburgerMenuPageObj.goToPerfBudget();
        assertionPage.verifyPerfBudgetPage();
        // go to perf category report page and assert category report page
        hamburgerMenuPageObj.goToCategoryReport();
        assertionPage.verifyPerfCategoryPage();
        // go to perf Controllable P&L report page and assert Controllable P&L page
        hamburgerMenuPageObj.goToControllabelPL();
        assertionPage.verifyPerfControllablePL();
        // go to perf Food Usage report page and assert Food Usage page
        hamburgerMenuPageObj.goToFoodUsageReport();
        assertionPage.verifyPerfFoodUsage();
        // go to perf Price Alert report page and assert price alert page
        hamburgerMenuPageObj.goToPriceAlert();
        assertionPage.verifyPerfPriceAlert();
        // go to perf Price Movers report page and assert movers alert page
        hamburgerMenuPageObj.goToPriceMovers();
        assertionPage.verifyPerfPriceMovers();
        // go to perf Usage report page and assert Usage alert page
        hamburgerMenuPageObj.goToFoodUsage();
        assertionPage.verifyPerfTheorUsage();
    });

    it("Check Vendor Page", () => {
        // go to vendor page
        hamburgerMenuPageObj.goToVendor();
        // check view access
        vendorsPage.viewVendors();
        // check add  and configure details access should not be there
        vendorsPage.checkAddVendorAndConfigureDetails();
        // check download feature
        vendorsPage.download();
        // check edit and delete feature should not be there
        vendorsPage.checkDeleteAndEditVendor();
    });

    it("Check Vendor Items Page", () => {
        // go to vendor page
        hamburgerMenuPageObj.goToVendorItems();
        // check view for VI
        vendorItemPage.viewVI();
        // check add new vi is not present
        vendorItemPage.checkAddButton();
        // check edit and delete button
        vendorItemPage.checkEditAndDelete();
        // check export option
        vendorItemPage.exportFeature();
    });

    it("Check Product Page", () => {
        // go to Product page
        hamburgerMenuPageObj.goToProduct();
        // view product
        productPage.viewProduct();
        // check create prod
        productPage.checkCreateProdButton();
        // check edit and delete button
        productPage.checkEditAndDelete();
        // check export
        productPage.checkExport();
    });

    it("Check Recipe Page", () => {
        // go to Recipe page
        hamburgerMenuPageObj.goToRecipeMenuItems();
        // check view and edit setup
        hamburgerMenuPageObj.checkForRecipeSetup();
        // check view and add feature
        menutemPage.viewListandAdd();
        // check for edit, delete and print
        menutemPage.checkForDeleteEditAndPrint();
        // check for kitchen display page
        hamburgerMenuPageObj.goToKitchenDisplay();
        assertionPage.verifyKitchenDisplayPage();
    });

    it("Check Inventory Page", () => {
        // check inventory summary
        hamburgerMenuPageObj.goToInventoriesSummary();
        // check content on summary page
        assertionPage.checkContentDisplayed();
        // go to Count sheet
        hamburgerMenuPageObj.goToInventoriesChild();
        // create Count Sheet and check for close/delete/reopen
        inventoryPageObj.createCountRole();
        inventoryPageObj.checkCountSheet();
        // check count sheet and product
        hamburgerMenuPageObj.checkProdAndCountSheet();
    });

    it("Check Labour Page", () => {
        hamburgerMenuPageObj.checkLaborMenu();
    });

    it("Check Bill Pay Pages", () => {
        hamburgerMenuPageObj.checkBillPayMenu();
    });

    it("Check Accounting Pages", () => {
        hamburgerMenuPageObj.checkAccMenu();
    });

    it("Check Setup Pages", () => {
        hamburgerMenuPageObj.checkSetupVerification();
        assertionPage.checkContentDisplayed();
    });
});