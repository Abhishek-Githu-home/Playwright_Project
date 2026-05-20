const { test, expect, request } = require('@playwright/test');
const strict = require('node:assert/strict');
const { kill } = require('node:process');

let webContext;
const FakePayload = { data: [], message: "No Order" };
test.describe('Verification of session storange and inject into new browser context', async () => {

    test.beforeAll('login bypass with API token', async ({ browser }) => {
        const Context = await browser.newContext()
        const page = await Context.newPage()
        const username = "6orwy@gmail.com"
        const password = "Test@12pass"

        await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
        await page.locator('#userEmail').fill(username)
        await page.getByPlaceholder('enter your passsword').fill(password);
        await page.getByRole('button', { name: 'login' }).click();
        await page.waitForLoadState('networkidle');

        await Context.storageState({ path: 'state.json' }) //This will create the state.json with the storage details includes token, cookies

        webContext = await browser.newContext({ storageState: 'state.json' })
    })

    test('Verify the login bypass by storage details and fetching the count', async () => {
        const page = await webContext.newPage()
        await page.goto('https://rahulshettyacademy.com/client')
        page.waitForLoadState('domcontentloaded')

        const BlinkingText = await page.locator('.blinkingText').allTextContents()
        console.log(BlinkingText)
        const locator = await page.locator('div.card')
        await locator.getByRole('button', { name: ' Add To Cart' }).nth(2).click()
        await page.getByText('Cart', { exact: true }).click()
         await page.getByRole('button', {name : 'ORDERS'}).click()
        const count = await page.locator('tr.ng-star-inserted').count()
        await page.waitForLoadState('domcontentloaded')
        console.log("The order count is : ", count)
    })

    test('Mocking the count with API - Network test', async () => {

        const page = await webContext.newPage()
        await page.goto('https://rahulshettyacademy.com/client')

        //Mocking with fakepayload (Mocked with 0 orders by defining the body)
        await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/69d98eedf86ba51a655a4a2e', route => {
            const response = page.request.fetch(route.request())
            let body = FakePayload;
            route.fulfill({
                response, body
            })
            //Intercept the response > API response > Playwright Fakeresponse > Browser > render on frontend UI
        })
        await page.getByRole('button', {name : 'ORDERS'}).click()
        const count = await page.locator('tr.ng-star-inserted').count()
        await page.waitForLoadState('domcontentloaded')
        console.log("The order count is : ", count)

    })
})