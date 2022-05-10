class inviteuserPage {
    element = {
        inviteUesrBtn: () => cy.xpath(`//*[@href="#/user/invite"]`),
        addEmail: () => cy.get(`[name="email"]`),
        selectRole: () => cy.get('[name="role"]').select("Restaurant Admin"),
        selectMEAdmin: () => cy.xpath(`//*[@class="form-horizontal"]//*[@class="icheckbox_minimal-blue"]`),
        inviteAllUser: () => cy.xpath(`//*[@ng-show="canInviteToWholeCompany"]//*[@class='icheckbox_minimal-blue']`),
        inviteBtn: () => cy.xpath(`//span[text()='Invite']`),
        showDD: () => cy.xpath(`(//div[@ng-show="isInStaffRole()"])[1]`),
        selctAllDD: () => cy.get(`[ng-click="changeRoleFilter()"]`),
        search: () => cy.get(`[ng-model="filterValue"]`),
        selectItem: () => cy.get(`.ui-grid-row.ng-scope`),
        roles: () => cy.get(`[ng-model="user.roles"]`).select('System Admin (Internal)'),
        saveBtn: () => cy.xpath(`(//span[text()='Save'])[1]`),
        setOffice: () => cy.get(`[ng-model="user.office"]`).select(`USA`),
        loginTxt: () => cy.get(`[ng-model="user.login"]`),
        lastName: () => cy.get(`[ng-model="user.lastName"]`),
        firstName: () => cy.get(`[ng-model="user.firstName"]`),
        acceptInvite: () => cy.xpath(`//*[@class="checkbox-inline icheck-label"]//*[text()='User invite accepted']`),
        resetPassword: () => cy.xpath(`(//*[@class="icheckbox_minimal-blue"])[3]`),
        pass: () => cy.get(`[ng-model="user.password"]`),
        confirmPass: () => cy.get(`[ng-model="user.confirmPassword"]`),
        accpetBtn: () => cy.get(`.btn.btn-primary.bootbox-accept`)
    };

    changeRole() {
        this.element.showDD().click();
        this.element.selctAllDD().click();
        this.element.search().type("skrab");
        this.element.selectItem().click();
        this.element.roles();
        this.element.setOffice();
        this.element.saveBtn().click();
        cy.wait(2000);
    }

    inviteUser(email, loginID, lName, fName) {
        this.element.inviteUesrBtn().click();
        this.element.addEmail().type(email);
        this.element.selectRole();
        this.element.inviteAllUser().click();
        this.element.inviteBtn().click();
        this.element.loginTxt().type(loginID);
        this.element.lastName().type(lName);
        this.element.firstName().type(fName);
        this.element.inviteBtn().click();
    }

    acceptInviteAndSetPassword(email, pass, confirmPass) {
        this.element.showDD().click();
        this.element.selctAllDD().click();
        this.element.search().type(email);
        this.element.selectItem().click();
        this.element.acceptInvite().click();
        this.element.resetPassword().should('be.visible').click();
        this.element.pass().type(pass);
        this.element.confirmPass().type(confirmPass);
        this.element.saveBtn().click();
    }

    addUnitAdmin() {
        this.element.inviteUesrBtn().click();
        this.element.addEmail().type(`unitadmin@example.com`);
        this.element.selectRole();
        this.element.inviteAllUser().click();
        this.element.inviteBtn().click();
    }

    accpetTerms() {
        cy.wait(2000);
        this.element.accpetBtn().should('be.visible').click({ multiple: true });
    }
}
module.exports = new inviteuserPage();