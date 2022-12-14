import { Selector,t } from "testcafe";

class RegisterPage {
    constructor() {
        this.genderOption = Selector('#gender-male');
        this.firstName = Selector('#FirstName');
        this.lastName = Selector('#LastName');
        this.dateOfBirthDayList = Selector("select[name='DateOfBirthDay']");
        this.dateOfBirthMonthList = Selector("select[name='DateOfBirthMonth']");
        this.dateOfBirthYearList = Selector("select[name='DateOfBirthYear']");
        this.email = Selector('#Email');
        this.password = Selector('#Password');
        this.confirmPassword = Selector('#ConfirmPassword');
        this.registerButton = Selector('#register-button.button-1.register-next-step-button');
        this.successMessage = Selector('div.result').withText('Your registration completed');
    }
    
    async selectDay(day) {
        const daysOption = this.dateOfBirthDayList.find('option');
        await t
            .click(this.dateOfBirthDayList)
            .click(daysOption.withText(day));
    }
    
    async selectMonth(month) {
        const monthsOption = this.dateOfBirthMonthList.find('option');
        await t
            .click(this.dateOfBirthMonthList)
            .click(monthsOption.withText(month));
    }
    
    async selectYear(year) {
        const yearsOption = this.dateOfBirthYearList.find('option');
        await t
            .click(this.dateOfBirthYearList)
            .click(yearsOption.withText(year));
    }
}

export default new RegisterPage();