import { Selector,t } from 'testcafe';

class CheckoutPage {
    constructor() { 
        this.countryList = Selector("select[id='BillingNewAddress_CountryId']");
        this.stateList = Selector("select[id='BillingNewAddress_StateProvinceId']");
        this.cityText = Selector("input[id='BillingNewAddress_City']");
        this.addressText = Selector("input[id='BillingNewAddress_Address1']");
        this.zipText = Selector("input[id='BillingNewAddress_ZipPostalCode']");
        this.phoneText = Selector("input[id='BillingNewAddress_PhoneNumber']");
        this.continueButton = Selector('button.button-1.new-address-next-step-button');
        this.nextDayOption = Selector("input[id='shippingoption_1']");
        this.nextShippingButton = Selector('button.button-1.shipping-method-next-step-button');
        this.nextPaymentButton = Selector('button.button-1.payment-method-next-step-button');
        this.nextConfirmButton = Selector('button.button-1.payment-info-next-step-button');
        this.confirmOrderButton = Selector('button.button-1.confirm-order-next-step-button');
        this.orderConfirmationMessage = Selector('strong').withText('Your order has been successfully processed!');
        this.viewOrderDetailsLink = Selector('a').withText('Click here for order details.');
    }

    async selectCountry(country) {
        const countryOption = this.countryList.find('option');
        await t
            .click(this.countryList)
            .click(countryOption.withText(country));
    }

    async selectState(state) {
        const stateOption = this.stateList.find('option');
        await t
            .click(this.stateList)
            .click(stateOption.withText(state));
    }
}

export default new CheckoutPage();