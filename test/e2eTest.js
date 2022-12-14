import { ClientFunction } from 'testcafe';
import homePage from '../pages/HomePage';
import registerPage from '../pages/RegisterPage';
import searchResults from '../pages/SearchResultPage'
import productDetails from '../pages/ProductDetailsPage'
import cartPage from '../pages/CartPage'
import checkoutPage from '../pages/CheckoutPage'
import myOrderPage from '../pages/MyOrderPage'

const URL = 'https://demo.nopcommerce.com/';
const getURL = ClientFunction(() => window.location.href);
var randomNumber = Math.floor(Math.random() * 10000);
var userEmail = 'hgabbas'+randomNumber+'@test.com';

fixture`E2E Fixture`
    .page(URL);
 
test('Assert home page', async t => {
    await t
        .expect(getURL()).eql(URL)
        .takeScreenshot()
        .expect(homePage.subTitleHeader.exists).ok();
});

test("Place Order E2E Tests", async (t) => {
    await t
        .maximizeWindow()
        .click(homePage.registerLink)
        .expect(getURL()).contains('register')
        .click(registerPage.genderOption)
        .typeText(registerPage.firstName, 'Ghulam')
        .typeText(registerPage.lastName, 'Abbas')
        .typeText(registerPage.email, userEmail)
        .typeText(registerPage.password, '123456')
        .typeText(registerPage.confirmPassword, '123456')
        .click(registerPage.registerButton)
        .expect(registerPage.successMessage.exists).ok();
    await homePage.search('Apple MacBook Pro 13-inch');
    await t
        .click(searchResults.productTitle)
        .expect(getURL()).contains('apple-macbook-pro-13-inch')
        .expect(productDetails.productPrice.exists).ok()
        .selectText(productDetails.productQuantity).pressKey("delete")
        .typeText(productDetails.productQuantity,'3')
        .click(productDetails.addToCart)
        .expect(productDetails.successMessage.exists).ok()
        .wait(3000)
        .click(homePage.cartLink)
        .click(cartPage.termsLabel)
        .click(cartPage.checkoutBtn)
        .expect(getURL()).contains('checkout');
    await checkoutPage.selectCountry('United States');
    await checkoutPage.selectState('Alaska');
    await t
        .takeScreenshot()
        .typeText(checkoutPage.cityText,'Any Town')
        .typeText(checkoutPage.addressText,'108 ddd test')
        .typeText(checkoutPage.zipText,'123456')
        .typeText(checkoutPage.phoneText,'332434345')
        .click(checkoutPage.continueButton)
        .click(checkoutPage.nextDayOption)
        .click(checkoutPage.nextShippingButton)
        .click(checkoutPage.nextPaymentButton)
        .click(checkoutPage.nextConfirmButton)
        .click(checkoutPage.confirmOrderButton)
        .expect(checkoutPage.orderConfirmationMessage.exists).ok()
        .click(checkoutPage.viewOrderDetailsLink)
        .click(homePage.myAccountLink)
        .click(myOrderPage.orders);
    });

    test("Change Currency Test", async (t) => {
        await homePage.changeCurrency('Euro')
    });