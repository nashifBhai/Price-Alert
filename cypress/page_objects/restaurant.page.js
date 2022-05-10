const sanityTestData = require("../fixtures/testData_Sanity.json")

class restaurantPage {
    element = {
        createRestBtn: () => cy.xpath('//*[@href="#/restaurantUnit/bulkAdd"]'),
        openConceptDD: () => cy.xpath(`//*[@ng-change="conceptChanged()"]`),
        typeTextInConceptDD: () => cy.xpath(`//*[@aria-label="Select a Concept"]`),
        selectItem: () => cy.get(`.ui-select-choices-row-inner`),
        openCompanyDD: () => cy.xpath(`//*[@ng-model="bulkAdd.company"]`),
        typeTextInCompanyDD: () => cy.xpath(`//*[@aria-label="Select a Company"]`),
        restaurantUnitName: () => cy.get('[name="unitName_0"]'),
        zipCode: () => cy.get(`[name="zip_0"]`),
        openPosDD: () => cy.xpath(`//*[@ng-model="unit.pos"]`),
        selectPOS: () => cy.xpath(`//div[text()='Aldelo']`),
        openAcc: () => cy.xpath(`//*[@ng-model="unit.accounting"]`),
        selectAcc: () => cy.xpath(`//div[text()='Intacct']`),
        subscriptionFd: () => cy.get(`[name="subscription_0"]`),
        openSalesSourceLead: () => cy.xpath(`//*[@ng-model="unit.salesLeadSource"]`),
        selectSalesSourceLead: () => cy.xpath(`//*[text()='Self Generated']`),
        email: () => cy.xpath(`//*[@ng-model="user.email"]`),
        login: () => cy.get(`[name="login_u_0"]`),
        meCheckBox: () => cy.xpath(`//*[text()='MarginEdge Admin']`),
        fName: () => cy.get(`[name="firstName_u_0"]`),
        lName: () => cy.get(`[name="lastName_u_0"]`),
        saveBtn: () => cy.xpath(`//*[@type="submit"]//*[text()='Save']`),
        confirmBtn: () => cy.xpath(`//*[@ng-click="create()"]`),
        statusRestDD: () => cy.get('[name="unitStatus"]').select("PAYING"),
        checkForReporting: () => cy.xpath(`(//*[@class='checkbox-inline icheck-label'])[1]`)
    };

    createRestaurant(conceptName, companyName, restName, emailID, loginID, strfName, strlName) {
        this.element.createRestBtn().click();
        //add created concept
        this.element.openConceptDD().click();
        this.element.typeTextInConceptDD().type(conceptName);
        this.element.selectItem().click();
        //add created company
        this.element.openCompanyDD().click();
        this.element.typeTextInCompanyDD().type(companyName);
        this.element.selectItem().click();
        //set for reporting
        this.element.checkForReporting().click();
        //set status
        this.element.statusRestDD();
        //set restaurant Name
        this.element.restaurantUnitName().type(restName);
        this.element.zipCode().type(sanityTestData.zipCode);
        //select POS
        this.element.openPosDD().click();
        this.element.selectPOS().click();
        //select Accounting
        this.element.openAcc().click();
        this.element.selectAcc().click();
        //set subscription
        this.element.subscriptionFd().type(sanityTestData.subscription);
        //select SLS
        this.element.openSalesSourceLead().click();
        this.element.selectSalesSourceLead().click();
        //set email and username
        this.element.email().type(emailID);
        this.element.login().type(loginID);
        this.element.meCheckBox().click();
        //set first name and last name
        this.element.fName().type(strfName);
        this.element.lName().type(strlName);
        //save
        this.element.saveBtn().click();
        this.element.confirmBtn().click();
        this.element.createRestBtn().should('be.visible');
    }
}
module.exports = new restaurantPage();