const hamburgerMenuPageObj = require("./hamburgerMenu.pageObj");

class headerPage {
    element = {
        //nameOfProperty:()=>cy.get/xpath(`location`),
        userNameDropdown:() => cy.xpath(`//button[@id='userNameDropdown']`),
        setting:() => cy.xpath(`//a[normalize-space()='Settings']`),
        emailField:()=>cy.xpath(`//*[@name='email']`),
        emailSetting:()=>cy.xpath(`//select[@name='priceAlertEmailPref']`),
        save:()=>cy.xpath(`//button[normalize-space()='Save']`),
        header:()=>cy.xpath(`//header[@class='MuiPaper-root MuiPaper-elevation MuiPaper-elevation4 MuiAppBar-root MuiAppBar-colorPrimary MuiAppBar-positionFixed _9EyycFCPcFVJJD351n2HDA== RnPN3BKFk3tIunEkHuhFsw== mui-fixed css-5poeop']`),


    };

    settingDetails() {
        //Object.element.method().cypressFunc();
        this.element.header().should(`be.visible`);
        console.log(`wait 1`);
        this.element.userNameDropdown().click();
        console.log(`wait 2`);
        this.element.setting().click();
        console.log(`wait 3`);
        cy.wait(5000);
        this.element.emailField().clear();
        this.element.emailField().type('margin.testlab@gmail.com');
        this.element.emailSetting().select('All concepts in one email');
        cy.wait(4000);
        this.element.save().click();

    }

}
module.exports = new headerPage();