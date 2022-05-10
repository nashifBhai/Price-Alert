class menuItemPage {
    element = {
        addNewMenuItemBtn: () => cy.xpath(`//*[@href="#/menuItem/new"]`),
        addNameTxt: () => cy.get(`input[ng-model="recipe.name"]`),
        addType: () => cy.get(`div[ng-model="recipe.type"]`),
        typeAddType: () => cy.xpath(`//*[@aria-label="Select a Recipe Type"]`),
        selectOption: () => cy.xpath(`(//*[@class='ui-select-choices-row-inner'])[1]`),
        addQuantityy: () => cy.get(`input[ng-change="updateYield(c)"]`),
        clickUnitDD: () => cy.get(`[name="yield_new1_unit"]`),
        selectItem: () => cy.contains('Bag'),
        menuPrice: () => cy.get(`[ng-model="recipe.salePrice"]`),
        saveBtn: () => cy.xpath(`(//*[text()='Save'])[1]`),
        searchValue: () => cy.xpath('//*[@ng-model="filterValue"]'),
        assertionList: () => cy.get('.ui-grid-row.ng-scope'),
        viewList: () => cy.xpath(`//*[@role="table"]`),
        selectItemFromList: () => cy.xpath(`(//*[@role="row"])[2]`),
        editRecipe: () => cy.get(`[ng-click="askEditConfirmationIfExternalRecipe(recipe)"]`),
        deleteBtn: () => cy.get(`[ng-click="delete()"]`),
        print: () => cy.get(`[ng-click="print(false)"]`),
        printCard: () => cy.get(`[ng-click="print(true)"]`)
    };

    viewListandAdd() {
        this.element.viewList().should('be.visible');
        this.element.addNewMenuItemBtn().should('not.exist');
    }

    checkForDeleteEditAndPrint() {
        this.element.selectItemFromList().click();
        this.element.editRecipe().should('be.disabled');
        this.element.deleteBtn().should('not.exist');
        this.element.print().should('be.visible');
        this.element.printCard().should('be.visible');
    }

    createRecipes(name, typeName) {
        this.element.addNewMenuItemBtn().should('be.visible').click();
        this.element.addNameTxt().type(name);
        this.element.addType().click();
        this.element.typeAddType().type(typeName);
        this.element.selectOption().click();
        this.element.addQuantityy().type("100");
        this.element.clickUnitDD().click();
        this.element.selectItem().click();
        this.element.menuPrice().type("45");
        this.element.saveBtn().click();
    }
}
module.exports = new menuItemPage();