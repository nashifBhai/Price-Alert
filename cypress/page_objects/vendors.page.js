class vendorPage {
    element = {
        addNewVendor: () => cy.xpath(`//*[@ui-sref="vendorNew"]`),
        addVendorName: () => cy.xpath(`(//*[@name="name"])[1]`),
        saveBtn: () => cy.xpath(`(//*[@type="submit"]//*[text()='Save'])[1]`),
        filterSearch: () => cy.xpath(`//*[@ng-model="filterValue"]`),
        assertionList: () => cy.get('.ui-grid-row.ng-scope'),
        selectItemFromRow: () => cy.xpath(`(//*[@class='ui-grid-row ng-scope'])[1]`),
        placeNewOrder: () => cy.xpath(`//*[@translate="inviosoApp.vendor.placeNewOrder"]`),
        addQuantity: () => cy.xpath(`(//*[@name="li.quantity"])[1]`),
        sendBtn: () => cy.xpath(`//*[@ng-click="saveAndSend($event)"]`),
        sendBtnConfirm: () => cy.xpath(`//*[@ng-click="doSaveAndSend($event)"]`),
        onlineOrder: () => cy.xpath(`//*[text()='Will you be placing orders via MarginEdge?']`),
        addEmail: () => cy.xpath(`//*[@ng-model="vendor.preferredOrderAddress"]`),
        viewVendorList: () => cy.xpath(`//*[@ng-style="colContainer.getViewportStyle()"]`),
        configureDetailsBtn: () => cy.get(`[href="#/vendor/defaultSettings"]`),
        deleteVendor: () => cy.get(`[ng-click="delete()"]`),
        editVendor: () => cy.contains('Edit Vendor'),
        downloadtoolTip: () => cy.get(`[uib-tooltip="Download order guide"]`),
        orderGuideSetup: () => cy.xpath(`//*[@ng-disabled='!vendor.id || vendor.importedEdiVendor']`),
        multiUnitOrderGuide: () => cy.xpath(`//*[@ng-click='multiTenantOrderGuide($event)']`)
    };

    createVendor(vendorName, email) {
        this.element.addNewVendor().click();
        this.element.addVendorName().type(vendorName);
        this.element.onlineOrder().click();
        this.element.addEmail().type(email);
        this.element.saveBtn().click();
    }

    placeNewOrder() {
        this.element.selectItemFromRow().click();
        this.element.placeNewOrder().click();
        this.element.addQuantity().type("4");
        this.element.sendBtn().click();
        this.element.sendBtnConfirm().click();
        cy.wait(3000);
    }

    viewVendors() {
        this.element.viewVendorList().should('be.visible');
    }

    checkAddVendorAndConfigureDetails() {
        this.element.configureDetailsBtn().should('not.be.visible');
        this.element.addNewVendor().should('not.be.visible');
    }

    checkDeleteAndEditVendor() {
        this.element.assertionList().click();
        this.element.deleteVendor().should('not.exist');
        this.element.editVendor().should('be.disabled');
    }

    download() {
        this.element.filterSearch().type("Arrow");
        this.element.downloadtoolTip().should('be.visible').click();
    }

    configureOrderGuide() {
        this.element.orderGuideSetup().click();
    }

    multiUnitOrderGuideSetup() {
        // manage Items for all restaurants is not visible for one unit
        this.element.multiUnitOrderGuide().click({ force: true });
    }
}
module.exports = new vendorPage();