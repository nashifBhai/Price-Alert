class vendorItemPage {
    element = {
        addNewVIBtn: () => cy.xpath(`//*[@ui-sref="vendorProductNew"]`),
        openVendorDD: () => cy.xpath(`//*[@ng-model="vendorProduct.vendor"]`),
        enterVendorName: () => cy.xpath(`//*[@aria-label="Select a vendor"]`),
        viNameTxtFd: () => cy.xpath(`(//*[@name="name"])[1]`),
        viItemCode: () => cy.xpath(`(//*[@name="productCode"])[1]`),
        clickProductFd: () => cy.xpath(`(//*[@ng-model="vendorProduct.product"])[1]`),
        typeProductFd: () => cy.xpath(`(//*[@aria-label="Select a product"])[1]`),
        selectItem: () => cy.get(`.ui-select-choices-row-inner`),
        clickAddPackaging: () => cy.xpath(`//*[@ng-click="addRow()"]`),
        handleRow: () => cy.xpath(`(//*[@class='ui-grid-cell-contents ng-binding ng-scope'])[1]`),
        input1: () => cy.get(`[name="inputForm"]`),
        handleRow2: () => cy.xpath(`(//*[@class='ui-grid-cell-contents ng-binding ng-scope'])[1]`),
        handleRow3: () => cy.xpath(`(//*[@class='ui-grid-cell-contents ng-binding ng-scope'])[3]`),
        selectRow: () => cy.xpath(`//*[@ng-click="selectButtonClick(row, $event)"]`),
        saveBtn: () => cy.xpath(`(//*[text()='Save'])[1]`),
        searchValue: () => cy.xpath('//*[@placeholder="Search"]'),
        assertionList: () => cy.xpath('//*[@role="rowgroup"]'),
        viewList: () => cy.get(`[ng-style="colContainer.getViewportStyle()"]`),
        deleteVI: () => cy.get(`[ng-click="delete()"]`),
        editVI: () => cy.contains('Edit Vendor Item'),
        exportBtn: () => cy.get(".btn-group.dropdown"),
        exportAsCSV: () => cy.get(`[ng-click="exportGrid($event, 'csv')"]`),
        exportAsPDF: () => cy.get(`[ng-click="exportGrid($event, 'pdf')"]`),
        selectVI: () => cy.xpath(`(//*[@class='ui-grid-row ng-scope'])[1]`)
    };

    createVI(vendorName, viName, viItemCode, prod, input1, input2, input3) {
        this.element.addNewVIBtn().click();
        this.element.openVendorDD().click();
        this.element.enterVendorName().type(vendorName);
        this.element.selectItem().click();
        this.element.viNameTxtFd().type(viName);
        this.element.viItemCode().type(viItemCode);
        this.element.clickProductFd().click();
        this.element.typeProductFd().type(prod);
        this.element.selectItem().click();
        this.element.clickAddPackaging().click();
        this.element.handleRow().click();
        this.element.input1().type(input1);
        this.element.handleRow2().click();
        this.element.input1().type(input2);
        this.element.handleRow3().click();
        this.element.input1().type(input3);
        this.element.selectRow().click();
        this.element.saveBtn().click();
    }

    viewVI() {
        this.element.viewList().should('be.visible');
    }

    checkAddButton() {
        this.element.addNewVIBtn().should('not.be.visible');
    }

    checkEditAndDelete() {
        this.element.selectVI().click();
        this.element.editVI().should('be.disabled');
        this.element.deleteVI().should('not.exist');
        cy.go('back');
    }

    exportFeature() {
        cy.wait(2000);
        this.element.exportBtn().click();
        this.element.exportAsCSV().should('be.visible');
        this.element.exportAsPDF().should('be.visible');
    }
}
module.exports = new vendorItemPage();