const hamburgerMenuPageObj = require("./hamburgerMenu.pageObj");
const headerPageObj = require("./header.pageObj");


class priceAlertPage {
    element = {
        //nameOfProperty:()=>cy.get/xpath(`location`),
        addNewPriceAlertBtn: () => cy.xpath(`(//button[@class='btn btn-primary btn-md ng-scope'])[1]`),
        clickVendor:() =>cy.xpath(`//span[@aria-label='Select a vendor activate']`),
        selectVendor:() => cy.xpath(`(//div[@title='Select a vendor'])[1]`),
        vendorItem:() => cy.xpath(`//span[@aria-label='Search for an item code or item name activate']`),
        vendorSelection:() =>cy.xpath(`//span[@class='ui-select-choices-row-inner']`),
        vendorItemSelection:() =>cy.xpath(`//div[contains(text(),'10X5.5X13.25 KRAFT SHOPPER 250')]`),
        //div[@id='ui-select-choices-row-1-0']//span[@class='ui-select-choices-row-inner']
        selectPackagingOption:() =>cy.xpath(`//span[@aria-label='Select a packaging option activate']`),
        packagingOptionSelectionn:() =>cy.xpath(`//div[contains(text(),'10 bd / 250')]`),
        selectEffectiveDate:() =>cy.xpath(`(//input[@name='effectiveDate'])[1]`),
        selcetTodayDate:() =>cy.xpath(`(//button[normalize-space()='Today'])[1]`),
        priceAlertAmount:() =>cy.xpath((`(//input[@placeholder='price'])[1]`)),
        savePriceAlert:() =>cy.xpath(`(//button[@class='btn btn-primary ng-scope'])[1]`),
        searchPriceAlert:()=> cy.xpath(`//input[@placeholder='Search Filter']`),
        selectPriceAlert:()=> cy.xpath(`//div[contains(text(),'Arrow')]`),
        deletePriceAlert:() =>cy.xpath(`//button[@class='btn btn-danger pull-right']`),
        deletePriceAlertPopUp:() =>cy.xpath(`//p[@class='ng-scope']`),
        deleteBtn:()=>cy.xpath(`//button[@class='btn btn-danger']`),
        selectVendor:()=>cy.xpath(`//span[@class='ui-select-placeholder text-muted ng-binding']`),
    };

    createEmailForManager() {
        //Object.element.method().cypressFunc();
        headerPageObj.element.settingDetails().click();
    }

    createPriceAlert() {
        //Object.element.method().cypressFunc();
        hamburgerMenuPageObj.element.priceAlert().click();
        hamburgerMenuPageObj.goToPriceAlert();
        this.element.addNewPriceAlertBtn().click();
        this.element.clickVendor().type('Arrow');
        //this.element.selectVendor().type('Arrow');
        this.element.vendorSelection().click();
        this.element.vendorItem().click();
        this.element.vendorItemSelection().click({force: true});

        this.element.selectPackagingOption().click({force: true});
        this.element.packagingOptionSelectionn().click();
        //cy.get(`//div[contains(text(),'10 bd / 250')]`).click();
        this.element.selectEffectiveDate().click();
        this.element.selcetTodayDate().click();
        this.element.priceAlertAmount().click().type("100");
        this.element.savePriceAlert().click();
        cy.wait(4000);
    }
    editPriceAlert() {
        //Object.element.method().cypressFunc();
        hamburgerMenuPageObj.element.priceAlert().click();
        hamburgerMenuPageObj.goToPriceAlert();
        this.element.searchPriceAlert().click().type("kraft shopper");
        this.element.selectPriceAlert().click();
        //price edited
        cy.wait(10000);
        this.element.priceAlertAmount().clear();
        
        this.element.priceAlertAmount().click().type("200");
        this.element.savePriceAlert().click();
        cy.wait(4000);


    }
    deletePriceAlert() {
        //Object.element.method().cypressFunc();
        hamburgerMenuPageObj.element.priceAlert().click();
        console.log("Here 6");
        hamburgerMenuPageObj.goToPriceAlert();
        console.log("Here 7");
        this.element.searchPriceAlert().click().type("kraft shopper");
        console.log("Here 8");
        this.element.selectPriceAlert().click();
        console.log("Here 9");
        //price edited
        cy.wait(10000);
        this.element.deletePriceAlert().click();
        console.log("Here 10");
        //this.element.deletePriceAlertPopUp.should(`Are you sure you want to delete Price Alert?`);
        console.log("Here 11");
        this.element.deleteBtn().click();
        console.log("Here 12");
    }
    placeNewOrder() {
        //Object.element.method().cypressFunc();
        hamburgerMenuPageObj.element.goToPlaceNewOrders().click();
        console.log("THere 6");
        this.element.selectVendor().click();
        console.log("THere 7");

    }

}
module.exports = new priceAlertPage();