class orderPage {
    element = {
        attachInvoiceBtn: () => cy.get('.mb10 > .ng-pristine'),
        uploadInv: () => cy.get(`input[type="file"]`),
        clickOKBtn: () => cy.get(`button[ng-click="photoDirectiveOkCallback()"]`),
        clickItem: () => cy.xpath(`(//*[@class='ui-grid-row ng-scope'])[1]`),
        endPreProcessingBTN: () => cy.get(`[ng-click="endPreprocessing()"]`),
        okBtn: () => cy.get(`.btn.btn-primary.bootbox-accept`),
        clickVendor: () => cy.get(`[ng-change="selectVendor()"]`),
        enterVendorName: () => cy.xpath(`//*[@aria-label="Select a vendor"]`),
        selectDDItem: () => cy.get(`.ui-select-choices-row.active`),
        invoiceNumber: () => cy.get(`[ng-model="order.initialReviewInvoiceNum"]`),
        customerName: () => cy.get(`[ng-model="order.initialReviewCustomerNum"]`),
        invoiceDate: () => cy.get(`[ng-model="order.initialReviewInvoiceDate"]`),
        todayDate: () => cy.get(`[ng-click="select('today', $event)"]`),
        verifiedTotal: () => cy.get(`[ng-model="order.initialReviewTotal"]`),
        openDD: () => cy.get(`[ng-change="irHandwrittenMarkupChanged()"]`).select('No'),
        initialReviewCompleteCheck: () => cy.xpath(`(//*[@class='checkbox-inline icheck-label'])[1]`),
        FinalReviewCompleteCheck: () => cy.xpath(`(//*[@class='checkbox-inline icheck-label'])[2]`),
        IRSaveBtn: () => cy.get(`[ng-click="save($event)"]`),
        invoiceNumberRecon: () => cy.get(`[ng-model="order.invoiceNum"]`),
        customerNameRecon: () => cy.get(`[ng-model="order.customerNum"]`),
        invoiceDateRecon: () => cy.xpath(`(//*[@name="invoiceDate"])[2]`),
        openDDRecon: () => cy.get(`[ng-change="handwrittenMarkupChanged()"]`).select('No'),
        saveBtnRecon: () => cy.xpath(`(//button[@type='submit'])[5]`),
        verifyBtn: () => cy.get(`[ng-click="verifyOrderAndClose()"]`),
        filterOption: () => cy.get(`[ng-model="filterValue"]`),
        clickLineItemBtn: () => cy.get(`[ng-click="addRow()"]`),
        saveLineItem: () => cy.xpath(`(//*[@ng-click="addNewItem($event)"])[2]`),
        newVendorItemRadio: () => cy.xpath(`(//*[@class='iradio_minimal-blue'])[1]`),
        itemCode: () => cy.get(`#provisionalProductCode`),
        vendorItem: () => cy.xpath(`(//*[@placeholder="Please enter a name for the Vendor Item"])[2]`),
        clickProductLI: () => cy.xpath(`(//*[@title="Select a product"])[2]`),
        typeProductName: () => cy.xpath(`(//*[@aria-label="Select a product"])[2]`),
        packagingTxt: () => cy.xpath(`(//*[@ng-model="newReconcileLineItem.unit.packaging"])[2]`),
        quanity: () => cy.xpath(`(//*[@ng-model="newReconcileLineItem.unit.quantity"])[2]`),
        unit: () => cy.xpath(`(//*[@ng-model="newReconcileLineItem.unit.unit"])[2]`),
        selectUnit: () => cy.contains("Bag"),
        price: () => cy.xpath(`(//*[@ng-model="newReconcileLineItem.unit.price"])[2]`),
        concernExpander: () => cy.xpath(`(//*[@ng-click="toggleConcerns($event, editForm.$invalid)"])[1]`),
        vendorItemVerified: () => cy.xpath(`//*[@class='icheck-label']`),
        viewAllOrder: () => cy.get('.ui-grid-viewport.ng-isolate-scope'),
        openDDForOrderStatus: () => cy.get(`#appendToEl`),
        selectFinalReviewDD: () => cy.xpath(`//*[@ng-click="changeViewBy($event, 'FINAL_REVIEW')"]`),
        selectVendor: () => cy.xpath(`//*[@ng-change="selectVendor()"]`),
        selectVendorDD: () => cy.xpath(`//*[text()='Arrow']`),
        addQuantity: () => cy.xpath(`(//*[@name="li.quantity"])[1]`),
        addQuantitys: () => cy.xpath(`(//*[@name="li.quantity"])[2]`),
        saveBtnPlaceOrder: () => cy.xpath(`//*[@ng-click="saveAndSend($event)"]`),
        saveConfirm: () => cy.xpath(`//*[@ng-click="doSaveAndSend($event)"]`),
        statusSent: () => cy.xpath(`//*[@ng-click="changeViewBy($event, 'SENT')"]`),
        statusSaved: () => cy.get(`[ng-click="changeViewBy($event, 'SAVED')"]`),
        approveInvoiceItem: () => cy.xpath(`//*[@href="#/invoiceApproval"]//*[@role='button']`),
        deleteOrder: () => cy.xpath(`//button[@ng-click='delete()']`),
        deleteConfirm: () => cy.xpath(`//*[@class='btn btn-danger']`),
        saveOrderBtn: () => cy.xpath(`//span[text()='Save']`),
        statusClosed: () => cy.get(`[ng-click="changeViewBy($event, 'CLOSED')"]`),
        noAccessToSetupTransfer: () => cy.xpath(`//p[text()='Invoices do not require approval.']`),
        addQuantityPlaceOrder: () => cy.get(`[ng-model="li.quantity"]`),
        sendBtn: () => cy.get(`[ng-click="saveAndSend($event)"]`),
        confirmSend: () => cy.get(`[ng-click="doSaveAndSend($event)"]`),
        skipInv: () => cy.get(`[ng-click="skip($event)"]`),
        askQues: () => cy.get(`[ng-click="addQuestion()"]`),
        addConcern: () => cy.get('.form-horizontal > :nth-child(2) > .form-control'),
        saveAndSkip: () => cy.get(`[ng-click="addNewQuestion($event)"]`),
        selectOrderItem:() =>cy.xpath(`(//div[@class='ui-grid-row ng-scope'])[1]`),
        confirmVendor:()=>cy.xpath(`//div[@id='ui-select-choices-row-0-0']`),
        searchVendorItemRec:()=>cy.xpath(`//input[@placeholder='Enter at least 2 characters to search for an item code or item name...']`),
        searchOrder:()=>cy.xpath(`//input[@placeholder='Search']`),
        selectRecItem:()=>cy.xpath(`//div[@class='ui-grid-row ng-scope']//*[contains(@class,'ui-grid-row-link ng-scope')]`),
        vendorRec:()=>cy.xpath(`//span[@aria-label='Select a vendor activate']`),
        vendorSelectRec:()=>cy.xpath(`//span[@class='ui-select-choices-row-inner']`),
        recQuantity:()=>cy.xpath(`//input[@name='quantity']`),
        recPrice:()=>cy.xpath(`//input[@name='unitPrice']`),
        recOk:()=>cy.xpath(`//button[normalize-space()='Ok']`),
        recPackagin:()=>cy.xpath(`(//input[@name='packagingSelection'])[1]`),
        isRecCheck:()=>cy.xpath(`(//div[@class='icheckbox_minimal-blue'])[1]`),
        recSave:()=>cy.xpath(`//*[@ng-click='reconcile($event)']`),
        recVerify:()=>cy.get(`[ng-click="verifyOrderAndClose()"] > .glyphicon`),
        orderFinalSelection:()=>cy.xpath(`(//div[@class='ui-grid-row ng-scope'])[1]`),
        finalReviewChekBox:()=>cy.xpath(`//span[normalize-space()='This order has been reviewed and should be closed.']`),
        finalReviewCloseOrder:()=>cy.xpath(`//button[@ng-click='reconcile($event)']`),
        finalReviewCompleted:()=>cy.xpath(`//button[@ng-click='verifyOrderAndClose()']//button[@ng-click='verifyOrderAndClose()']`),
        searchOrderFinalReview:()=>cy.xpath(`//input[@placeholder='Search']`),
        selectFinalReviewOrder:()=>cy.xpath(`//a[@class='ui-grid-row-link ng-scope']//div[contains(text(),'PO 1')]`),
        checkCloseOrderFinalReview:()=>cy.xpath(`//div[@ng-show="order.status!=='CLOSED' && !hasActiveConcern() && !hasActiveAMConcern() && !requiresEdiImage() && !posOnlyClient"]`),
        saveBtnFR:()=>cy.xpath(`//button[@ng-click='reconcile($event)']`),
        verifyBtnFR:()=>cy.xpath(`//button[@ng-click='verifyOrderAndClose()']`),
        inVoiceNumberClosedOrder:()=>cy.xpath(`//input[@name='invoiceNum']`),
        deleteInvoice:()=>cy.xpath(`//button[@ng-click='delete()']`),
        selectFinalReviewOrder2:()=>cy.xpath(`//a[@class='ui-grid-row-link ng-scope']//a[@class='ui-grid-row-link ng-scope']`),
        orderDeleteReason:()=>cy.xpath(`//label[normalize-space()='The customer asked me to.']`),
        orderDeleteReasonText:()=>cy.get('.ng-invalid.ng-dirty > .modal-body > [ng-if="isInStaffRole()"] > .form-control'),
        orderDelete:()=>cy.get('.modal-footer > .btn-danger > .ng-scope'),

    };

    closeOrder() {
        this.element.concernExpander().click();
        this.element.vendorItemVerified().click();
        this.element.initialReviewCompleteCheck().click();
        this.element.saveBtnRecon().click();
        this.element.verifyBtn().click();
        cy.wait(3000);
    }

    finalReviewProcess(itemCodeStr, vIName, prodName) {
        cy.wait(3000);
        this.element.clickLineItemBtn().click({ force: true });
        this.element.newVendorItemRadio().click();
        this.element.itemCode().type(itemCodeStr);
        this.element.vendorItem().type(vIName);
        this.element.clickProductLI().click();
        this.element.typeProductName().type(prodName);
        this.element.selectDDItem().click();
        this.element.packagingTxt().type("Pack");
        this.element.quanity().type("10");
        this.element.unit().click();
        this.element.selectUnit().click();
        this.element.price().type("199");
        this.element.saveLineItem().click();
        cy.wait(3000);
        this.element.FinalReviewCompleteCheck().click();
        this.element.saveBtnRecon().click();
        this.element.verifyBtn().click();
    }

    cancelPreProcessing() {
        cy.wait(2000);
        this.element.clickItem().click();
        this.element.endPreProcessingBTN().click();
        this.element.okBtn().click();
    }

    endPreProcessing() {
        cy.wait(2000);
        this.element.endPreProcessingBTN().click();
        this.element.okBtn().click();
    }

    attachInvoice() {
        const fileName = "image.jpg";
        this.element.attachInvoiceBtn().click();
        this.element.uploadInv().attachFile(fileName);
        cy.wait(10000);
        this.element.clickOKBtn().click();
    }

    searchOrder(orderName) {
        this.element.filterOption().type(orderName);
        cy.wait(2000);
        this.element.clickItem().click();
    }
    searchOrderFR() {
        cy.wait(5000);
        this.element.clickItem().click();
    }

    editInvoiceNumber(){
        cy.wait(3000);
        this.element.inVoiceNumberClosedOrder().clear();
        this.element.inVoiceNumberClosedOrder().type('invoiceNumber1111');
    }
    saveInvoiceNumber(){
        this.element.saveBtnFR().should('be.visible').click();
    }
    deleteInvoice(){
        cy.wait(3000);
        this.element.deleteOrder().should('be.visible');
        cy.wait(3000);
        this.element.deleteOrder().click();
        cy.wait(3000);
        this.element.orderDeleteReason().click();
        this.element.orderDeleteReasonText().click().type('This is the order customer asked me to delete');
        cy.wait(3000);
        this.element.orderDelete().click();
        cy.wait(3000);
    }
    orderNotExist(){
        this.element.searchOrderFinalReview().type('invoiceNumber1111');
        this.element.clickItem().should('not.exist');
    }
    viewOrder() {
        this.element.viewAllOrder().should("exist");
    }

    checkForEdit() {
        this.element.openDDForOrderStatus().click();
        this.element.selectFinalReviewDD().click();
        cy.wait(2000);
        this.element.clickItem().click();
    }

    placeOrder() {
        this.element.selectVendor().should('be.visible').click();
        this.element.selectVendorDD().click();
        this.element.addQuantity().type("8");
        this.element.saveBtnPlaceOrder().click();
        this.element.saveConfirm().click();
        cy.wait(1000);
    }

    saveOrder() {
        this.element.selectVendor().should('be.visible').click();
        this.element.selectVendorDD().click();
        this.element.addQuantity().type("8");
        this.element.saveOrderBtn().click();
        cy.wait(1000);
    }

    changeStatusToSent() {
        this.element.openDDForOrderStatus().click();
        this.element.statusSent().click();
    }

    changeStatusToSaved() {
        this.element.openDDForOrderStatus().click();
        this.element.statusSaved().click();
    }

    changeStatusToClosed() {
        this.element.openDDForOrderStatus().click();
        this.element.statusClosed().click();
    }

    checkApproveInvoiceTab() {
        this.element.approveInvoiceItem().should('not.exist');
    }

    resendOrder() {
        cy.wait(3000);
        this.element.clickItem().click();
        this.element.addQuantitys().type("10");
        this.element.saveBtnPlaceOrder().click();
        this.element.saveConfirm().click();
        cy.wait(2000);
        // changing status to sent again as its not updating automatically
        this.changeStatusToSent();
    }

    deleteOrderCheck() {
        cy.wait(2000);
        this.element.clickItem().click();
        this.element.deleteOrder().should('not.be.visible');
    }

    deleteOrderInv() {
        cy.wait(2000);
        this.element.clickItem().click();
        this.element.deleteOrder().click();
        this.element.deleteConfirm().click();
        cy.wait(2000);
    }

    checkInitailTransfer() {
        this.element.noAccessToSetupTransfer().should('be.visible');
    }
    selectItemForInitialReview() {
        cy.wait(2000);
        this.element.selectOrderItem().click();
    }
    selectForInitialReview() {
        cy.wait(2000);
        this.element.selectVendor().click();
        console.log("testb 1");
        this.element.enterVendorName().type('Arrow');
        this.element.confirmVendor().click();
        this.element.invoiceNumber().type('Price Alert');
        this.element.invoiceDate().click();
        this.element.todayDate().click();
        this.element.verifiedTotal().type("300");
        this.element.openDD();
        this.element.initialReviewCompleteCheck().click();
    }
    initialReview(){
        cy.wait(3000);
        this.element.selectOrderItem().should(`be.visible`).click();
        this.element.selectVendor().should(`be.visible`).click();
        console.log(`This is the 1`);

        this.element.enterVendorName().should(`be.visible`).type(`Arrow`);
        this.element.confirmVendor().should(`be.visible`).click();
        this.element.invoiceNumber().should(`be.visible`).type(`POC Invoice 1`);
        console.log(`thisia1`);
        this.element.invoiceDate().should(`be.visible`).click();
        this.element.todayDate().should(`be.visible`).click();
        this.element.verifiedTotal().should(`be.visible`).type(`300`);
        console.log(`thisia11`);
        /* cy.xpath(`(//*[@class='checkbox-inline pull-right icheck-label'])[1]`).then(($body) => {
                    if ($body.text().includes('No address is provided')) {
                        cy.get(`#noInfoPresent`).click();
                        cy.get(`#noPhonePresent`).click();
                    }
                }); */
        console.log(`thisis2`);
        this.element.openDD();
        this.element.initialReviewCompleteCheck().should(`be.visible`).click();
        console.log(`thisis3`);
        this.element.IRSaveBtn().should(`be.visible`).click();
        console.log(`IR Complete`);

    }
    reconcialltionProcess(){
        cy.wait(3000);
        this.element.selectOrderItem().click();
        cy.wait(3000);

        //this.element.searchOrder().type(`Price Alert Invoice`);
        //this.element.selectRecItem().click();
        //this.element.selectOrderItem().click();
        this.element.vendorRec().type('Arrow');
        cy.wait(1000);
        this.element. vendorSelectRec().click();
        this.element.invoiceNumberRecon().type(`PO 1`);
        this.element.invoiceDateRecon().click();
        this.element.todayDate().click();
        /* cy.xpath(`(//*[@class='checkbox-inline pull-right icheck-label'])[1]`).then(($body) => {
            if ($body.text().includes('No address is provided')) {
                cy.get(`#noInfoPresent`).click();
                cy.get(`#noPhonePresent`).click();
            }
        }); */
        console.log(`thisis21`);
        //Line Item
        this.element.clickLineItemBtn().click();
        cy.wait(3000);
        this.element.searchVendorItemRec().type(`Kraft Shopper`);
        this.element.vendorSelectRec().click();
        this.element.recQuantity().should(`be.visible`).type(`1`);
        this.element.recPrice().type(`150`);
        this.element.recOk().click();
        this.element.recPackagin().click();
        this.element.saveBtnRecon().click();
        console.log(`this is for the rec 11`)
        this.element.openDDRecon();
        this.element.isRecCheck().click();
        this.element.recSave().click();
        this.element.recVerify().click();
        cy.wait(1000);
        /* this.element.searchVendorItemRec().type(`Kraft Shopper`).then(($body)=> {
        if($body.text().includes('10X5.5X13.25 KRAFT SHOPPER 250')){
        cy.get(`//div[@id='ui-select-choices-row-12-0']//*[.='10X5.5X13.25 KRAFT SHOPPER 250']`).click();
        }
        }); */
        /* console.log(`This is the 11`);

        this.element.enterVendorName().type(`Arrow`);
        this.element.confirmVendor().click();
        this.element.invoiceNumberRecon().type(`Price Alert Invoice`);
        console.log(`thisia11 rec`);
        this.element.invoiceDateRecon().click();
        this.element.todayDate().click();
        console.log(`thisia111`);
        cy.xpath(`(//*[@class='checkbox-inline pull-right icheck-label'])[1]`).then(($body) => {
                    if ($body.text().includes('No address is provided')) {
                        cy.get(`#noInfoPresent`).click();
                        cy.get(`#noPhonePresent`).click();
                    }
                });
        console.log(`thisis21`);
        //Line Item
        this.element.clickLineItemBtn().click();
        this.element.searchVendorItemRec().type(`Kraft Shopper`).then(($body)=> {
            if($body.text().includes('10X5.5X13.25 KRAFT SHOPPER 250')){
                cy.get(`//div[@id='ui-select-choices-row-12-0']//*[.='10X5.5X13.25 KRAFT SHOPPER 250']`).click();
            }
        });
        console.log(`this is for the rec 11`)
        this.element.openDDRecon();
        this.element.initialReviewCompleteCheck().click();
        console.log(`thisis31`);
        this.element.saveBtnRecon().click();
        console.log(`Rec Complete`);
        this.element.verifyBtn().click();
        console.log(`Rec Complete Done`); */


    }
    finalReviewProcessOrder(){
        cy.wait(3000);
        this.element.searchOrderFinalReview().type('PO 1');
        cy.wait(3000);
        this.element.selectFinalReviewOrder().click();
        cy.wait(3000);
        console.log(`1000`);
        this.element.checkCloseOrderFinalReview().click();
        cy.wait(1000);
        console.log(`1001`);
        this.element.saveBtnFR().click();
        cy.wait(1000);
        console.log(`1002`);
        this.element.verifyBtnFR().click();
        console.log(`1003`);
        cy.wait(5000);
        this.element.searchOrderFinalReview().clear();
        cy.wait(3000);
        this.element.searchOrderFinalReview().type('PO 1');
        cy.wait(3000);
        this.element.selectFinalReviewOrder().click();
        console.log(`1000`);
        this.element.inVoiceNumberClosedOrder().clear();
        this.element.inVoiceNumberClosedOrder().type(`PO 2222`);
        cy.wait(1000);
        this.element.saveBtnFR().click();
        cy.wait(3000);
        this.element.searchOrderFinalReview().clear();
        cy.wait(3000);
        this.element.searchOrderFinalReview().type('PO 2222');
        cy.wait(3000);
        this.element.clickItem().click();
        cy.wait(3000);
        this.element.deleteOrder().click();
        cy.wait(1000);
        this.element.orderDeleteReason().click();
        this.element.orderDeleteReasonText().click().type('This is the order customer asked me to delete');
        cy.wait(3000);
        this.element.orderDelete().click();
        cy.wait(3000);
        this.element.clickItem().should('not.be.visible');

        /* this.element.searchOrderFinalReview().clear();
        cy.wait('1000');
        this.element.searchOrderFinalReview().type('PO 1');
        cy.wait(3000);
        console.log(`2000`); */
        
        /* this.element.inVoiceNumberClosedOrder().clear();
        cy.wait(1000);
        console.log(`1000`)
        this.element.inVoiceNumberClosedOrder().type(`PO 2222`);
        cy.wait(1000);
        this.element.saveBtnFR().click();
        cy.wait(1000);
        this.element.searchOrderFinalReview().clear();
        cy.wait(1000);
        this.element.searchOrderFinalReview().type('PO 2222');
        cy.wait(3000);
        this.element.selectFinalReviewOrder().click();
        cy.wait(1000);
        this.element.deleteInvoice().click(); */
    }

    placeNewOrder(vendor) {
        this.element.clickVendor().click();
        this.element.enterVendorName().type(vendor);
        this.element.selectDDItem().click();
        this.element.addQuantityPlaceOrder().type("89");
        this.element.sendBtn().click();
        this.element.confirmSend().should('be.visible').click();
    }

    irProcessWithTenantCheck(unitName, invoiceNumberStr, customerNameStr) {
        cy.get('#unitMenu_dd').then($el => {
            // $el is a jQuery object
            if ($el.text() == unitName) {
                console.log("Restaurant Matched! Go Ahead");
                cy.wait(3000);
                this.element.clickVendor().click();
                this.element.selectDDItem().should('be.visible').click({ multiple: true });
                this.element.invoiceNumber().type(invoiceNumberStr);
                this.element.customerName().type(customerNameStr);
                this.element.invoiceDate().click();
                this.element.todayDate().click();
                //condition to check no address
                cy.xpath(`(//*[@class='checkbox-inline pull-right icheck-label'])[1]`).then(($body) => {
                    if ($body.text().includes('No address is provided')) {
                        cy.get(`#noInfoPresent`).click();
                        cy.get(`#noPhonePresent`).click();
                    }
                });
                this.element.verifiedTotal().type("99");
                this.element.openDD();
                this.element.initialReviewCompleteCheck().click();
                this.element.IRSaveBtn().click();
                cy.wait(3000);
            } else {
                cy.wait(1500);
                this.element.askQues().click();
                cy.wait(2000);
                this.element.addConcern().click();
                this.element.addConcern().type("Skipping due to tennat mismatch");
                this.element.saveAndSkip().click();
                cy.wait(5000);
                this.irProcessWithTenantCheck(unitName, invoiceNumberStr, customerNameStr);
            }
        });
    }

    ReconcialltionProcessWithTenantCheck(unitName, invoiceNumberStr, customerNameStr) {
        cy.get('#unitMenu_dd').then($el => {
            // $el is a jQuery object
            if ($el.text() == unitName) {
                console.log("Restaurant Matched! Go Ahead");
                cy.wait(3000);
                cy.wait(3000);
                this.element.clickVendor().click();
                this.element.selectDDItem().click();
                this.element.invoiceNumberRecon().type(invoiceNumberStr);
                this.element.customerNameRecon().type(customerNameStr);
                this.element.invoiceDateRecon().click();
                this.element.todayDate().click();
                //condition to check no address
                cy.xpath(`(//*[@class='checkbox-inline pull-right icheck-label'])[1]`).then(($body) => {
                    if ($body.text().includes('No address is provided')) {
                        cy.get(`#noInfoPresent`).click();
                        cy.get(`#noPhonePresent`).click();
                    }
                });
                this.element.openDDRecon();
                this.element.initialReviewCompleteCheck().click();
                this.element.saveBtnRecon().click();
                cy.wait(3000);
                this.element.verifyBtn().click();
            } else {
                cy.wait(5000);
                this.element.askQues().click();
                this.element.addConcern().click();
                this.element.addConcern().type("Skipping due to tennat mismatch");
                this.element.saveAndSkip().click();
                cy.wait(5000);
                this.irProcessWithTenantCheck(unitName, invoiceNumberStr, customerNameStr);
            }
        });
    }
}
module.exports = new orderPage();