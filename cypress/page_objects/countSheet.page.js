class countSheetPage {
    element = {
        addNewCountSheet: () => cy.get(`[ui-sref="inventorySetupNew"]`),
        countSheetName: () => cy.get(`[ng-model="inventorySetup.name"]`),
        selectCheckBoxFood: () => cy.xpath(`(//*[@class="icheckbox_minimal-blue"])[1]`),
        addProduct: () => cy.get(`[ng-click="addProducts($event)"]`),
        clickProductDD: () => cy.get(`[ng-change="newProductSelected()"]`),
        clickProductAdd: () => cy.xpath(`(//*[@aria-label="Select a product"])[1]`),
        selectItem: () => cy.get(`.ui-select-choices-row-inner`),
        saveProduct: () => cy.xpath(`//*[@ng-click="addNewProduct($event)"]`),
        addRecipe: () => cy.get(`[ng-click="addRecipe($event)"]`),
        clickRecipeDD: () => cy.get(`[ng-change="newRecipeSelected()"]`),
        enterRecipe: () => cy.xpath(`//*[@aria-label="Select a recipe"]`),
        saveRecipe: () => cy.get(`[ng-click="addNewRecipe($event)"]`),
        saveBtn: () => cy.xpath(`(//*[text()='Save'])[1]`)
    };

    createCountSheet(countSheetName, prodName, recipeName) {
        this.element.addNewCountSheet().click();
        this.element.countSheetName().type(countSheetName);
        this.element.selectCheckBoxFood().click();
        this.element.addProduct().click();
        this.element.clickProductDD().click();
        this.element.clickProductAdd().type(prodName);
        this.element.selectItem().click();
        this.element.saveProduct().click();
        this.element.addRecipe().click();
        this.element.clickRecipeDD().click();
        this.element.enterRecipe().type(recipeName);
        this.element.selectItem().click();
        this.element.saveRecipe().click();
        this.element.saveBtn().click();
    }

    createCountSheetRole(countSheetName) {
        this.element.addNewCountSheet().click();
        this.element.countSheetName().type(countSheetName);
        this.element.selectCheckBoxFood().click();
        this.element.saveBtn().click();
    }
}
module.exports = new countSheetPage();