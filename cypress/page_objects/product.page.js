class productPage {
    element = {
        addNewProduct: () => cy.xpath(`//*[@ui-sref="productNew"]`),
        productName: () => cy.xpath(`//*[@ng-model="centralProduct"]`),
        enterProductName: () => cy.xpath(`(//*[@aria-label="Select a product"])[1]`),
        selectItem: () => cy.xpath(`(//*[@class='ui-grid-row ng-scope'])[2]`),
        selectProduct: () => cy.get(`.ui-select-choices-row-inner`),
        productCategoryClick: () => cy.xpath(`(//*[@name="dst__0_productType"])[1]`),
        selectProductCategory: () => cy.contains(`Beer`),
        reportUnit: () => cy.xpath(`(//*[@name="reportUnit"])[2]`).select('Bottle'),
        price: () => cy.xpath(`(//*[@name="reportPrice"])[2]`),
        saveBtn: () => cy.xpath(`(//*[text()='Save'])[1]`),
        searchBtn: () => cy.xpath(`//*[@ng-model="filterValue"]`),
        assertList: () => cy.xpath(`//*[@class="ui-grid-row ng-scope"]`),
        deleteProd: () => cy.get(`[ng-click="delete()"]`),
        editProd: () => cy.contains("Edit Product"),
        viewProd: () => cy.get(`[ng-style="getGridHeight()"]`),
        exportBtn: () => cy.contains("Export as"),
        exportAsCSV: () => cy.get(`[ng-click="exportGrid($event)"]`)
    };

    createProduct(productName) {
        this.element.addNewProduct().click();
        this.element.productName().click();
        this.element.enterProductName().type(productName);
        this.element.selectProduct().click();
        this.element.productCategoryClick().click();
        this.element.selectProductCategory().click();
        this.element.reportUnit();
        this.element.price().type("35");
        this.element.saveBtn().click();
    }

    viewProduct() {
        this.element.viewProd().should('be.visible');
    }

    checkCreateProdButton() {
        this.element.addNewProduct().should('not.be.visible');
    }

    checkEditAndDelete() {
        this.element.searchBtn().type("Baby Carrots");
        this.element.selectItem().click();
        this.element.editProd().should('be.disabled');
        this.element.deleteProd().should('not.exist');
        cy.go('back');
    }

    checkExport() {
        this.element.exportBtn().should('be.visible').click();
        this.element.exportAsCSV().click({ multiple: true });
    }
}
module.exports = new productPage();