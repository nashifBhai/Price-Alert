class hamburgerMenuPage {
    element = {
        centralOption: () => cy.get(`#navbar_central`),
        companiesCentralOp: () => cy.xpath(`//*[@href="#/company"]//*[@role="button"]`),
        conceptsCentralOp: () => cy.xpath(`//*[@href="#/concept"]//*[@role="button"]`),
        restaurantCentralOp: () => cy.xpath(`//*[@href="#/restaurantUnit"]//*[@role="button"]`),
        vendorParent: () => cy.get(`#navbar_vendors`),
        vendorChild: () => cy.xpath(`//*[@href="#/vendor"]//*[@role="button"]`),
        vendorItem: () => cy.xpath(`//*[@href="#/vendorProduct"]//*[@role='button']`),
        categories: () => cy.xpath(`//*[@href="#/productType"]//*[@role="button"]`),
        accountings: () => cy.get(`#navbar_accounting`),
        productChild: () => cy.xpath(`//*[@href="#/product"]//*[@role="button"]`),
        productParent: () => cy.get(`#navbar_products`),
        recipesParent: () => cy.get(`#navbar_recipes`),
        InventoryParent: () => cy.get(`#navbar_inventory`),
        inventoryChild: () => cy.xpath(`//*[@href="#/inventory"]//*[@role='button']`),
        recipeSetup: () => cy.xpath(`//*[@href="#/recipeSetup"]//*[@role='button']`),
        menuItems: () => cy.xpath(`//*[@href="#/menuItem"]//*[@role='button']`),
        countSheet: () => cy.xpath(`//*[@href="#/inventorySetup"]//*[@role="button"]`),
        OrdersParent: () => cy.get(`#navbar_order`),
        orderChild: () => cy.xpath(`//*[@href="#/order"]//*[@role='button']`),
        placeNewOrder: () => cy.xpath(`//*[@href="#/order/new"]//*[@role='button']`),
        setup: () => cy.get(`#navbar_setup`),
        unitSettings: () => cy.xpath(`//*[@href="#/unitConfig"]//*[@role='button']`),
        users: () => cy.xpath(`//*[@href="#/user"]//*[@role='button']`),
        priorityReport: () => cy.xpath(`//*[@href="#/usageReport/systemPriority"]//*[@role='button']`),
        integration: () => cy.xpath(`//*[@href="#/integration"]//*[@role='button']`),
        pos: () => cy.xpath(`//*[@href="#/pos"]//*[@role='button']`),
        usageReport: () => cy.xpath(`//*[@href="#/usageReport"]//*[@role='button']`),
        uploadReports: () => cy.xpath(`//*[@href="#/uploadReport"]//*[@role='button']`),
        notifications: () => cy.xpath(`//*[@href="#/notifications"]//*[@role='button']`),
        vendorMapping: () => cy.xpath(`//*[@href="#/accounting/vendorMapping"]//*[@role='button']`),
        paymentMapping: () => cy.xpath(`//*[@href="#/accounting/balanceSheetAccounts"]//*[@role='button']`),
        exports: () => cy.xpath(`//*[@href="#/accounting/invoices"]//*[@role='button']`),
        setupInitialTransfer: () => cy.xpath(`//*[@href="#/order/setup"]//*[@role='button']`),
        performance: () => cy.get(`#navbar_performance`),
        budgetPerf: () => cy.xpath(`//*[@href="#/budget/overview//"]//*[@role='button']`),
        categoryReport: () => cy.xpath(`//*[@href="#/categoryReport"]//*[@role='button']`),
        controllabelPL: () => cy.xpath(`//*[@href="#/profitAndLoss/overview"]//*[@role='button']`),
        foodUsageReport: () => cy.xpath(`//*[@href="#/foodUsageReport"]//*[@role='button']`),
        sales: () => cy.xpath(`//*[@href='#/salesReport']//*[@role='button']`),
        priceAlert: () => cy.xpath(`//*[@href="#/priceAlert"]//*[@role='button']`),
        priceMovers: () => cy.xpath(`//*[@href="#/priceMovers"]//*[@role='button']`),
        foodUsage: () => cy.xpath(`//*[@href="#/theoreticalFoodUsage"]//*[@role='button']`),
        kitchenDisplay: () => cy.xpath(`//*[@href="#/kitchenViewer"]//*[@role='button']`),
        inventorySumm: () => cy.xpath(`//*[@href="#/inventorySummary/"]//*[@role='button']`),
        inventoryProd: () => cy.xpath(`//*[@href="#/inventorySetup/newItems"]//*[@role='button']`),
        laborMenu: () => cy.get(`#navbar_labor`),
        billPayMenu: () => cy.get(`#navbar_billpay`),
        billPayInvoices: () => cy.xpath(`//*[@href="#/accounting/billPay"]//*[@role='button']`),
        billPayPayments: () => cy.xpath(`//*[@href="#/accounting/billPayCharges"]//*[@role='button']`),
        billPaySetup: () => cy.xpath(`//*[@href="#/accounting/billPaySetup"]//*[@role='button']`),
        setupVerification: () => cy.xpath(`//*[@href="#/verification"]//*[@role='button']`),
        billingSetup: () => cy.xpath(`//*[@href="#/unitBilling"]//*[@role='button']`),

    };

    checkSetupVerification() {
        this.element.billingSetup().should('not.exist');
        this.element.users().should('not.exist');
        this.element.integration().should('not.exist');
        this.element.pos().should('not.exist');
        this.element.usageReport().should('not.exist');
        this.element.uploadReports().should('not.exist');
        this.element.notifications().should('not.exist');
        this.element.setup().click();
        this.element.setupVerification().should('be.visible').click();
    }
    goToPerfBudget() {
        this.element.performance().click();
        this.element.budgetPerf().click();
    }
    goToCategoryReport() {
        this.element.categoryReport().click();
    }
    goToControllabelPL() {
        this.element.controllabelPL().click();
    }
    goToFoodUsageReport() {
        this.element.foodUsageReport().click();
    }
    goToPriceAlert() {
        cy.wait(1000);
        this.element.performance().click();
    }
    goToPriceMovers() {
        this.element.priceMovers().click();
    }
    goToFoodUsage() {
        this.element.foodUsage().click();
    }
    goToSales() {
        this.element.sales().click();
    }
    goToUnitSettings() {
        this.element.setup().scrollIntoView();
        this.element.setup().should('be.visible').click();
        this.element.unitSettings().click();
    }
    goToIntegration() {
        this.element.setup().click();
        this.element.integration().click();
    }
    goToPriorityReport() {
        cy.wait(2000);
        cy.reload();
        this.element.setup().should("be.visible").click();
        this.element.priorityReport().scrollIntoView().click();
    }
    goToUsers() {
        this.element.setup().click();
        this.element.users().click();
    }
    goToOrders() {
        this.element.orderChild().click({
            force: true
        });
    }
    goToPlaceOrders() {
        this.element.placeNewOrder().click({
            force: true
        });
    }
    goToOrderSetup() {
        this.element.setupInitialTransfer().click();
    }
    goToCloseOrders() {
        this.element.OrdersParent().should("be.visible").click();
    }
    goToInventories() {
        this.element.InventoryParent().click();
        this.element.inventoryChild().click();
    }
    goToInventoriesSummary() {
        this.element.InventoryParent().click();
        this.element.inventorySumm().click();
    }
    goToInventoriesChild() {
        this.element.inventoryChild().click();
    }
    goToCountSheet() {
        this.element.InventoryParent().click();
        this.element.countSheet().click();
    }
    goToMenuItems() {
        this.element.menuItems().click();
    }
    goToRecipeMenuItems() {
        this.element.recipesParent().click();
        this.element.menuItems().click();
    }
    goToKitchenDisplay() {
        this.element.kitchenDisplay().click();
    }
    goToRecipeSetup() {
        this.element.recipesParent().click();
        this.element.recipeSetup().click();
    }
    checkForRecipeSetup() {
        this.element.recipeSetup().should("not.exist");
    }
    goToConcept() {
        cy.wait(1500);
        this.element.centralOption().scrollIntoView();
        this.element.centralOption().should("be.visible").click();
        this.element.conceptsCentralOp().click();
    }
    goToCompanies() {
        this.element.companiesCentralOp().click();
    }
    goToRestaurant() {
        this.element.restaurantCentralOp().click();
    }
    goToVendor() {
        this.element.vendorParent().click();
        this.element.vendorChild().click();
    }
    goToVendorItems() {
        this.element.vendorParent().click();
        this.element.vendorItem().click();
    }
    goToCategories() {
        this.element.accountings().click();
        this.element.categories().click();
        this.element.accountings().click();
    }
    goToPaymentMapping() {
        this.element.accountings().click({ force: true });
        this.element.paymentMapping().click();
        this.element.accountings().click();
    }
    goToExports() {
        this.element.exports().click();
        this.element.accountings().click();
    }
    goToVendorMapping() {
        // this.element.accountings().click();
        this.element.vendorMapping().click({ force: true });
        this.element.accountings().click();
    }
    goToProduct() {
        this.element.productParent().click();
        this.element.productChild().click();
    }
    checkProdAndCountSheet() {
        this.element.countSheet().should('not.exist');
        this.element.inventoryProd().should('not.exist');
    }
    checkLaborMenu() {
        this.element.laborMenu().should('not.exist');
        cy.wait(2000);
    }
    checkBillPayMenu() {
        this.element.billPayMenu().should('not.exist');
    }
    checkAccMenu() {
        this.element.accountings().should('not.exist');
    }
    
}
module.exports = new hamburgerMenuPage();