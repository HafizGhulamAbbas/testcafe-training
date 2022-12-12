import {Selector} from 'testcafe';

const developerName = "#developer-name";
const osOption = "#macos";
const submitButton = "#submit-button"

fixture("First Fixture")
    .page("https://devexpress.github.io/testcafe/example/");


// Fixture meta
// fixture.meta('Version', '1')("First Fixture")
//     .page("https://devexpress.github.io/testcafe/example/");

test("First Test", async t => {
    await t
        .typeText(developerName, "TAU")
        .click(osOption)
        .click(submitButton);
});

// If want to override the fixture.page
test.page("https://devexpress.github.io/testcafe/example/")
("First Test", async t => {
    await t
        .typeText(developerName, "TAU")
        .click(osOption)
        .click(submitButton);
});

// test meta and command would be like testcafe chrome tests/firstTest.js --test-meta env=production
test.meta('env', 'production')
("First Test", async t => {
    await t
        .typeText(developerName, "TAU")
        .click(osOption)
        .click(submitButton);
});