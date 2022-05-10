class inventoryPage {
    element = {
        clickEnterACount: () => cy.xpath(`(//*[@ng-hide="viewingSpecificInventoryDate"])[1]`),
        clickCreatedCountSheetRole: () => cy.xpath(`(//*[@ng-click="takeInventory(s)"])[1]`),
        clickDateBar: () => cy.xpath(`//*[@name="inventoryDate"]`),
        clickTodayDate: () => cy.xpath(`//*[@ng-click="select('today', $event)"]`),
        saveAndExit: () => cy.xpath(`//*[@ng-click="saveAndExit($event)"]`),
        addQuantity: () => cy.xpath(`(//*[@ng-model="i.quantity"])[1]`),
        searchFilter: () => cy.get(`[ng-model="filterValue"]`),
        selectItem: () => cy.xpath(`(//*[@class="ui-grid-row ng-scope"])[2]`),
        selectItemRole: () => cy.xpath(`(//*[@class="ui-grid-row ng-scope"])[3]`),
        closeInventory: () => cy.get(`[ng-click="saveAndClose($event)"]`),
        okBtn: () => cy.xpath(`//*[@class="btn btn-primary bootbox-accept"]`),
        delete: () => cy.get(`[ng-click="delete()"]`),
        printCS: () => cy.xpath(`(//*[@ng-hide="viewingSpecificInventoryDate"])[2]`)
    };

    createCountRole() {
        this.element.printCS().should('be.visible');
        this.element.clickEnterACount().click();
        this.element.clickCreatedCountSheetRole().click();
        cy.wait(2000);
        this.element.clickDateBar().click();
        this.element.clickTodayDate().click();
        cy.go('back');
    }

    checkCountSheet() {
        this.element.searchFilter().type("Closed");
        this.element.selectItemRole().click();
        this.element.closeInventory().should('not.be.visible');
        this.element.delete().should('not.exist');
    }
}
module.exports = new inventoryPage();