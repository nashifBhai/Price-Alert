class recipeSetupPage {
    element = {
        recipeSetupBtn: () => cy.xpath(`//*[@href="#/recipeType"]`),
        addNewRecipeTypeBtn: () => cy.get(`[href="/#/recipeType/new"]`),
        addNameTxt: () => cy.get('[name="name"]'),
        addCategoryDD: () => cy.xpath(`//*[@placeholder="Select a Category Type"]`),
        selectMenuItems: () => cy.get('.MuiAutocomplete-popper li[data-option-index="0"]'),
        saveBtn: () => cy.xpath(`//*[text()='Save']`),
        selectRecipeItem: () => cy.xpath(`//*[@href='#/recipeType/1/edit']`),
        editRecipeSetup: () => cy.xpath(`//*[@ng-show='isEdit']`),
        openKitchendisplayAppPage: () => cy.xpath(`//*[.='Open Kitchen Display Application']`)
    };

    createMenuTypes(name) {
        this.element.recipeSetupBtn().click();
        this.element.addNewRecipeTypeBtn().click();
        this.element.addNameTxt().type(name);
        this.element.addCategoryDD().click();
        this.element.selectMenuItems().click();
        this.element.saveBtn().click();
        cy.wait(2000);
    }

    checkForEditRecipeSetup() {
        this.element.recipeSetupBtn().click();
        this.element.selectRecipeItem().click();
        this.element.editRecipeSetup().should('not.exist');
    }

    goToOpenDisplayKitchenApplicationPage() {
        this.element.openKitchendisplayAppPage().should('be.visible');
    }
}
module.exports = new recipeSetupPage();