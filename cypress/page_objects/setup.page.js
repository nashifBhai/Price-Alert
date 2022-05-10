const hamburgerMenuPageObj = require("./hamburgerMenu.pageObj");
class setupPage {
    element = {
        features: () => cy.xpath(`//div[@class='ui-grid-viewport ng-isolate-scope'][@role='rowgroup']//div[.='FEATURES']`),
        nightlySalesCheckBox: () => cy.xpath(`//div[contains(@class,'icheckbox_minimal-blue')]/parent::label[contains(.,'NIGHTLY_SALES_DATA')]//input`),
        saveButton: () => cy.get(`span[translate='entity.action.save']`)
    };

    enableFlagForSales() {
        // go to setup > unitSettings >features >check nightlySalesData
        hamburgerMenuPageObj.goToUnitSettings();
        this.element.features().click();
        // checkbox has class with hidden property display:none
        this.element.nightlySalesCheckBox().check({ force: true });
        this.element.saveButton().click();
    }
}
module.exports = new setupPage();