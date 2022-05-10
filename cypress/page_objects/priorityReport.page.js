class priorityReport {
    element = {
        search: () => cy.get(`[ng-model="filterValue"]`),
        clickIRBtn: () => cy.get(`[ng-click="startTasks('INITIAL_REVIEW')"]`),
        clickReconcialltionBtn: () => cy.get(`[ng-click="startTasks('PENDING_RECONCILIATION')"]`),
        okBtn: () => cy.get(`[ng-click="howManyBulkModalOk()"]`),
        selectRow: () => cy.get(`[ng-model="row.isSelected"]`)
    };

    startIR(tenantName) {
        this.element.search().type(tenantName);
        this.element.selectRow().click();
        this.element.clickIRBtn().click();
        this.element.okBtn().click();
        cy.wait(8000);
    }

    startReconcillations(tenantName) {
        this.element.search().type(tenantName);
        this.element.selectRow().click();
        this.element.clickReconcialltionBtn().click();
        this.element.okBtn().click();
        cy.wait(8000);
    }
}
module.exports = new priorityReport();