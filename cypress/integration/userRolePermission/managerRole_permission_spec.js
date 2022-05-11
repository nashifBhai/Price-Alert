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
const inventoriesRolePage = require("../../page_objects/inventoriesRole.page");


const urlToHit = process.env.npm_config_url || "http://localhost:8080/";
console.log("Running against: " + urlToHit);

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

beforeEach(() => {
    // open the application and verify elements from Login page
    cy.visit(urlToHit);
    loginPageObjs.verifyLoginPageElement();
});

afterEach(() => {
    // logout from application
    loginPageObjs.logout();
});

describe('Role Permission Verification for Manager', () => {
    it('verify Home page', () => {
        // to make sure Nightly Sales data checkBox is checked so that sales will be visible for manager
        // login as admin 
        loginPageObjs.loginAs(usernames.adminUN, creds.password);
        // make "Wasabi Tysons" as tenant to get feature  from Key visible
        loginPageObjects.chooseTenant(testData.tenantName);
        // check Nightly Sales data checkbox
        setupPageObjs.enableFlagForSalesAndCustomReports();
        // logout from admin
        loginPageObjs.logout();
        // login as manager
        loginPageObjs.loginAs(usernames.managerUN, creds.password);
        // verify elements from Home page
        loginPageObjs.verifyHomePage();
    });

    it("Check Order Page", () => {
        // login as manager
        loginPageObjs.loginAs(usernames.managerUN, creds.password);
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
        // attach and upload invoice
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
        // login as manager
        loginPageObjs.loginAs(usernames.managerUN, creds.password);
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
        // go to perf Sales page and assert sales page
        hamburgerMenuPageObj.goToSales();
        assertionPage.verifyPerfSales();
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
        // login as manager
        loginPageObjs.loginAs(usernames.managerUN, creds.password);
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
        // click order guide setup
        vendorsPage.configureOrderGuide();
        // click manage Items for all restaurants
        vendorsPage.multiUnitOrderGuideSetup();
    });

    it("Check Vendor Items Page", () => {
        // login as manager
        loginPageObjs.loginAs(usernames.managerUN, creds.password);
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
        // login as manager
        loginPageObjs.loginAs(usernames.managerUN, creds.password);
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
        // login as manager
        loginPageObjs.loginAs(usernames.managerUN, creds.password);
        // view recipe setup
        hamburgerMenuPageObj.goToRecipeSetup();
        assertionPage.verifyRecipeSetupPage();
        // check edit recipe setup
        recipeSetupPage.checkForEditRecipeSetup();
        // go to Recipe page
        hamburgerMenuPageObj.goToRecipeMenuItems();
        // check view and add feature
        menutemPage.viewListandAdd();
        // check for edit, delete and print
        menutemPage.checkForDeleteEditAndPrint();
        // check for kitchen display page
        hamburgerMenuPageObj.goToKitchenDisplay();
        assertionPage.verifyKitchenDisplayPage();
        recipeSetupPage.goToOpenDisplayKitchenApplicationPage();
    });

    it("Check Inventory Page", () => {
        // login as manager
        loginPageObjs.loginAs(usernames.managerUN, creds.password);
        // check inventory summary
        hamburgerMenuPageObj.goToInventoriesSummary();
        // check content on summary page
        assertionPage.checkContentDisplayed();
        // check for post to accounting-not visible
        hamburgerMenuPageObj.checkForPostToAccounting();
        // go to inventories
        hamburgerMenuPageObj.goToInventoriesChild();
        // create Count Sheet and check for close/delete/reopen
        inventoriesRolePage.createAndCloseCountRole();
        hamburgerMenuPageObj.goToInventoriesChild();
        // reopen Inventories
        inventoriesRolePage.reOpenInventories();
        // deleye inventories
        inventoriesRolePage.deleteInventories();
        // check count sheet and product
        hamburgerMenuPageObj.goToCountSheetChild();
        inventoriesRolePage.importAndPrintCountSheet();
        // check product
        hamburgerMenuPageObj.goToProductInventoryChild();
    });

    it("Check Labour Page", () => {
        // login as manager
        loginPageObjs.loginAs(usernames.managerUN, creds.password);
        hamburgerMenuPageObj.checkLaborMenu();
    });

    it("Check Bill Pay Pages", () => {
        // login as manager
        loginPageObjs.loginAs(usernames.managerUN, creds.password);
        hamburgerMenuPageObj.checkBillPayMenu();
    });

    it("Check Accounting Pages", () => {
        // login as manager
        loginPageObjs.loginAs(usernames.managerUN, creds.password);
        hamburgerMenuPageObj.goToCategoriesChild();
        assertionPage.checkContentDisplayed();
    });

    it("Check Setup Pages", () => {
        loginPageObjs.loginAs(usernames.managerUN, creds.password);
        hamburgerMenuPageObj.goToSetup();
        hamburgerMenuPageObj.checkSetupBilling();
        // go to users and veify
        hamburgerMenuPageObj.goToSetupUsers();
        assertionPage.checkContentDisplayed();
        // go to integration and veify
        hamburgerMenuPageObj.goToSetupIntegration();
        assertionPage.checkContentDisplayed();
        // go to POS and veify
        hamburgerMenuPageObj.goToSetupPOS();
        assertionPage.checkContentDisplayed();
        hamburgerMenuPageObj.checkSetupUsageReport();
        // go to upload reports and veify
        hamburgerMenuPageObj.goToSetupUploadReports();
        assertionPage.checkContentDisplayed();
        // go to setup verification and veify
        hamburgerMenuPageObj.goToSetupVerification();
        assertionPage.checkContentDisplayed();
        hamburgerMenuPageObj.checkSetupNotification();
    })
});
