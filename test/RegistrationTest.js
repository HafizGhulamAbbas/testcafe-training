import { ClientFunction, fixture } from "testcafe";
import homePage from "../pages/HomePage";
import registerPage from "../pages/RegisterPage";
import loginPage from "../pages/LoginPage";
import customerPage from "../pages/CustomerPage";

const dataSet = require('../data/data.json');

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

    dataSet.forEach(data => {
        test('User Registration and Login Test', async t => {
            await t
                .click(homePage.registerLink)
                .expect(getURL()).contains('register')
                .click(registerPage.genderOption)
                .typeText(registerPage.firstName, data.firstName)
                .typeText(registerPage.lastName, data.lastName);
            await registerPage.selectDay(data.birthDay);
            await registerPage.selectMonth(data.birthMonth);
            await registerPage.selectYear(data.birthYear);
            await t
                .typeText(registerPage.email, data.email + randomNumber + '@test.com')
                .typeText(registerPage.password, data.password)
                .typeText(registerPage.confirmPassword, data.password)
                .click(registerPage.registerButton)
                .expect(registerPage.successMessage.exists).ok()
            // Logout
                .click(homePage.logoutLink)
            // Login with Registered Account
                .click(homePage.loginLink)
                .expect(loginPage.accountHeader.exists).ok()
                .typeText(loginPage.emailInput, data.email + randomNumber + '@test.com')
                .typeText(loginPage.passwordInput, data.password)
                .click(loginPage.submitButton)
            // Goto My Account
                .click(homePage.myAccountLink)
            // Check Orders is displayed
                .expect(customerPage.ordersLink.exists).ok()
                .click(customerPage.ordersLink)
                .expect(customerPage.noOrdersLabel.exists).ok()
                .takeScreenshot();
        });
    });