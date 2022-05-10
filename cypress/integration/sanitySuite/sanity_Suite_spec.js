const loginPageObjs = require("../../page_objects/login.pageObjects");
const creds = require("../../fixtures/credentials.json");
const sanityTestData = require("../../fixtures/testData_Sanity.json")
const utilObj = require("../../utils/util");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const vendorPageObj = require("../../page_objects/vendors.page");
const conceptPageObj = require("../../page_objects/concept.page");
const companyPageObj = require("../../page_objects/companies.page");
const restaurantPageObj = require("../../page_objects/restaurant.page");
const categoryPageObj = require("../../page_objects/categories.page");
const productPageObj = require("../../page_objects/product.page");
const vendorItemPageObj = require("../../page_objects/vendorItems.page");
const menuItemPageObj = require("../../page_objects/menutem.page");
const menuSetupPageObj = require("../../page_objects/recipeSetup.page");
const countSheetPageObj = require("../../page_objects/countSheet.page");
const inventoryPageObj = require("../../page_objects/inventories.page");
const inviteUserPage = require("../../page_objects/inviteUser.page");
const orderPageObj = require("../../page_objects/order.page");
const priorityReportPage = require("../../page_objects/priorityReport.page");
const intacctPageObj = require("../../page_objects/integrationIntacct.page");
const vendorMappingPage = require("../../page_objects/vendorMapping.page");
const paymentMapPage = require("../../page_objects/paymentMap.page");
const exportPage = require("../../page_objects/export.page");

let timeStamp = new Date().toISOString();
//creating global variable for test
let createCompanyName = sanityTestData.companyName + timeStamp;
let createConceptName = sanityTestData.conceptName + timeStamp;
let createZenDeskID = sanityTestData.zendeskID + timeStamp;
export const createRestName = sanityTestData.restaurant + timeStamp;
let createVendorName = sanityTestData.vendorName + timeStamp;
export const countSheetName = sanityTestData.CountSheetName + utilObj.makeid();
let emailID = "test" + utilObj.makeid() + "@gmail.com";
let emailInviteUser = "inviteuser" + utilObj.makeid() + "@example.com";
let loginIDInviteUser = "inviteuser" + utilObj.makeid();
let pass = "Test@12345";
let confirmPass = pass;
let loginID = "test" + utilObj.makeid().toLowerCase();
let firstName = "Prashant" + utilObj.makeid().toLowerCase();
let lastName = "Sinha" + utilObj.makeid().toLowerCase();
let productName = sanityTestData.productName + utilObj.makeid();
let vendorItemName = sanityTestData.VIName + utilObj.makeid();
let recipeTypeName = sanityTestData.productName + utilObj.makeid();
let recipeName = sanityTestData.recipeName + utilObj.makeid();
let invoiceNumberStr = sanityTestData.invoiceNumber + utilObj.makeid();
let customerNameStr = sanityTestData.customerName + utilObj.makeid();
let itemCode = sanityTestData.itemCode + utilObj.makeid();
let lineItemVI = sanityTestData.itemCode + utilObj.makeid();

const urlToHit = process.env.npm_config_url || "http://localhost:8080/";
console.log("Running against: " + urlToHit);

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

beforeEach(() => {
    //open the application and verify elements
    cy.visit(urlToHit);
    loginPageObjs.verifyLoginPageElement();
});

afterEach(() => {
    //logout from app
    loginPageObjs.logout();
});

describe("Sanity Spec", () => {
    it("Pre-SignIn Verification, Login As Admin", () => {
        //cy.visit(urlToHit);
        //loginPageObjs.verifyLoginPageElement();
        loginPageObjs.loginAs(creds.adminName, creds.password);
    });

    it("Create Concept,Companies and Restaurant", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        //go to concept
        hamburgerMenuPageObj.goToConcept();
        //create concept
        conceptPageObj.createConcept(createConceptName);
        conceptPageObj.element.searchBtn().type(createConceptName);
        conceptPageObj.element.assertionList().should("be.visible");
        //goTo Company Page
        hamburgerMenuPageObj.goToCompanies();
        //create Company
        companyPageObj.createCompany(createCompanyName, createZenDeskID);
        conceptPageObj.element.searchBtn().type(createCompanyName).should("be.visible");
        //go to restaurant
        hamburgerMenuPageObj.goToRestaurant();
        //create restaurant
        restaurantPageObj.createRestaurant(createConceptName, createCompanyName, createRestName, emailID, loginID, firstName, lastName);
        //logout
        loginPageObjs.logout();
        //login and select the tenant
        loginPageObjs.loginAs(creds.adminName, creds.password);
        loginPageObjs.chooseTenant(createRestName);
        cy.wait(2000);
    });

    it("Add UnitAdmin to the Restaurant", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        //go to Users
        hamburgerMenuPageObj.goToUsers();
        //invite User and Add to the Restaurant
        inviteUserPage.addUnitAdmin();
    });

    it("Login as UnitAdmin, Upload Invoice and Cancel Preprocessing as an Admin", () => {
        loginPageObjs.loginAs(creds.unitAdmin, creds.password);
        utilObj.checkRestUnitWO(createRestName);
        //go to order
        hamburgerMenuPageObj.goToOrders();
        //upload invoice
        orderPageObj.attachInvoice();
        loginPageObjs.logout();
        //login as admin and cancel preprocessing
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        hamburgerMenuPageObj.goToOrders();
        //select Invoice and cancel preprocessing
        orderPageObj.cancelPreProcessing();
    });

    it("Create a Vendor", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        let emailIDV = "test" + utilObj.makeid() + "@gmail.com";
        utilObj.checkRestUnit(createRestName, createRestName);
        //go to vendors
        hamburgerMenuPageObj.goToVendor();
        //create new vendor
        vendorPageObj.createVendor(createVendorName, emailIDV); // add placing order in the flow
        vendorPageObj.element.filterSearch().type(createVendorName);
        //assert the created vendor
        vendorPageObj.element.assertionList().should("be.visible");
    });

    it("Import Category", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        //goto product page
        hamburgerMenuPageObj.goToCategories();
        //import
        categoryPageObj.importCategory();
    })

    it("Create Products", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        //goto product page
        hamburgerMenuPageObj.goToProduct();
        //create product
        productPageObj.createProduct(productName);
        productPageObj.element.searchBtn().type(productName);
        //assert the created product
        productPageObj.element.assertList().should("be.visible");
    });

    it("Create Vendor Items", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        //go to vendors
        hamburgerMenuPageObj.goToVendorItems();
        //create new vendor item
        vendorItemPageObj.createVI(createVendorName, vendorItemName, utilObj.makeid(), productName, "Test", "4", "40");
        vendorItemPageObj.element.searchValue().type(vendorItemName);
        //assert the created vendor items
        vendorItemPageObj.element.assertionList().should("be.visible");
    });

    it("Place an order through Vendor", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        //go to vendors
        hamburgerMenuPageObj.goToVendor();
        //place new order
        vendorPageObj.placeNewOrder();
    });

    it("Create Recipe Menu Type and Recipe", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        //go to recipe setup
        hamburgerMenuPageObj.goToRecipeSetup();
        //create menu type
        menuSetupPageObj.createMenuTypes(recipeTypeName);
        //go to menu items
        hamburgerMenuPageObj.goToMenuItems();
        //create recipe
        menuItemPageObj.createRecipes(recipeName, recipeTypeName);
        vendorItemPageObj.element.searchValue().type(recipeName);
        //assert the created recipe menu type
        vendorItemPageObj.element.assertionList().should("be.visible");
    });

    it("Create Count Sheet and Add Recipe and Product", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        //go to Count sheet
        hamburgerMenuPageObj.goToCountSheet();
        //create Count Sheet
        countSheetPageObj.createCountSheet(countSheetName, productName, recipeName);
    });

    it("Enter a Count, Add Date and Close it", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        //go to Count sheet
        hamburgerMenuPageObj.goToInventories();
        //create Count Sheet
        inventoryPageObj.createCount();
    });

    // waiting for ME-15800 to get fixed

    it("Login as Analyst 1, Complete the Initial Review", () => {
        loginPageObjs.loginAs(creds.accountManager, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        //go to Priority Report
        hamburgerMenuPageObj.goToPriorityReport();
        //start the IR
        cy.wait(10000);
        priorityReportPage.startIR(createRestName);
        //update the IR Form
        orderPageObj.irProcessWithTenantCheck(createRestName, invoiceNumberStr, customerNameStr);
        cy.wait(10000);
    });

    it("Login as Analyst 2, Complete the Reconciallations", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        //go to Priority Report
        hamburgerMenuPageObj.goToPriorityReport();
        //start the Reconcialltions
        priorityReportPage.startReconcillations(createRestName);
        //update the reconcialltion flow
        orderPageObj.ReconcialltionProcessWithTenantCheck(createRestName, invoiceNumberStr, customerNameStr);
    });

    it("Login as Lead Analyst , Complete the Final Review", () => {
        loginPageObjs.loginAs(creds.leadAnalyst, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        //go to Orders
        hamburgerMenuPageObj.goToOrders();
        //start the Final Review
        orderPageObj.searchOrder(invoiceNumberStr);
        orderPageObj.finalReviewProcess(itemCode, lineItemVI, productName);
    });

    it("Login as Account Manager , Close the Order", () => {
        loginPageObjs.loginAs(creds.accountManager, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        //go to Orders
        hamburgerMenuPageObj.goToOrders();
        //start the Final Review
        orderPageObj.searchOrder(invoiceNumberStr);
        orderPageObj.closeOrder();
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
    });

    it("Invite User and Login as the created user", () => {
        loginPageObjs.loginAs(creds.adminName, creds.password);
        utilObj.checkRestUnit(createRestName, createRestName);
        //invite user role
        hamburgerMenuPageObj.goToUsers();
        inviteUserPage.inviteUser(emailInviteUser, loginIDInviteUser, lastName, firstName);
        // //search user and accept the invite
        // inviteUserPage.acceptInviteAndSetPassword(loginIDInviteUser, pass, confirmPass);
        //logout and login as created user
        // loginPageObjs.loginAs(loginIDInviteUser, pass);
        // inviteUserPage.accpetTerms();
    });
});

/*describe("User Registration", () => {
    it("Invite New User", function() {
        cy.visit(urlToHit);
        loginPageObjs.verifyLoginPageElement();
        loginPageObjs.loginAs(creds.adminName, creds.password);

    });
    /*it("Using gmail_tester.get_messages(), look for an email with registration link", function() {
        // debugger; //Uncomment for debugger to work...
        cy.task("gmail:get-messages", {
            options: {
                from: "no-reply-stage@marginedge.com",
                subject: "Welcome to MarginEdge",
                include_body: true,
                before: new Date(2021, 11, 24) // Before Nov 24rd, 2019 12:31:13
            }
        }).then(emails => {
            const body = emails[0].body.html;
            // console.log(body);
            var HtmlToJsonString = JSON.stringify(body);
            // get the url from the body
            var rawBody = HtmlToJsonString.split(`href=`);
            var rawURL = rawBody[1].split(`">`);
            var finalURL = rawURL[0].split(`"`);
            var finalNavigatingURl = finalURL[1];
            console.log(finalNavigatingURl);
            //write invite user registration flow
            // cy.visit(finalNavigatingURl);
        });
    });
}); */