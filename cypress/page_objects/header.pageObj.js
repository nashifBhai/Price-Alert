const hamburgerMenuPageObj = require("./hamburgerMenu.pageObj");

class headerPage {
    element = {
        //nameOfProperty:()=>cy.get/xpath(`location`),
        userNameDropdown:() => cy.xpath(`//button[@id='userNameDropdown']`),
        setting:() => cy.xpath(`//a[normalize-space()='Settings']`),
        emailField:()=>cy.xpath(`//*[@name='email']`),
        emailSetting:()=>cy.xpath(`//select[@name='priceAlertEmailPref']`),
        save:()=>cy.xpath(`//button[normalize-space()='Save']`)

    };

    settingDetails() {
        //Object.element.method().cypressFunc();
        
        this.element.userNameDropdown().click();
        this.element.setting().click();
        cy.wait(5000);
        this.element.emailField().clear();
        this.element.emailField().type('margin.testlab@gmail.com');
        this.element.emailSetting().select('All concepts in one email');
        cy.wait(4000);
        this.element.save().click();

    }

}
module.exports = new headerPage();