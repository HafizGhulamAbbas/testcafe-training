import { ClientFunction, fixture } from "testcafe";
import homePage from "../pages/HomePage";
import registerPage from "../pages/RegisterPage";
import loginPage from "../pages/LoginPage";
import customerPage from "../pages/CustomerPage";

const URL = "https://demo.nopcommerce.com/";
const getURL = ClientFunction(() => window.location.href);
var randomNumber = Math.floor(Math.random() * 10000);
const userEmail = 'hgabbas' + randomNumber + '@test.com';

fixture("Registration Page")
    .page(URL);

    test('Assert Home Page Test', async t => {
        await t
            .expect(getURL()).eql(URL)
            .takeScreenshot()
            .expect(homePage.subTitleHeader.exists).ok();
    });

    test('User Registration and Login Test', async t => {
        await t
            .click(homePage.registerLink)
            .expect(getURL()).contains('register')
            .click(registerPage.genderOption)
            .typeText(registerPage.firstName, 'Ghulam')
            .typeText(registerPage.lastName, 'Abbas');
        await registerPage.selectDay('2');
        await registerPage.selectMonth('May');
        await registerPage.selectYear('1992');
        await t
            .typeText(registerPage.email, userEmail)
            .typeText(registerPage.password, '123456')
            .typeText(registerPage.confirmPassword, '123456')
            .click(registerPage.registerButton)
            .expect(registerPage.successMessage.exists).ok()
        // Logout
            .click(homePage.logoutLink)
        // Login with Registered Account
            .click(homePage.loginLink)
            .expect(loginPage.accountHeader.exists).ok()
            .typeText(loginPage.emailInput, userEmail)
            .typeText(loginPage.passwordInput, '123456')
            .click(loginPage.submitButton)
        // Goto My Account
            .click(homePage.myAccountLink)
        // Check Orders is displayed
            .expect(customerPage.ordersLink.exists).ok()
            .click(customerPage.ordersLink)
            .expect(customerPage.noOrdersLabel.exists).ok()
            .takeScreenshot();
    });