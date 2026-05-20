const { test, expect } = require('@playwright/test')
const { brotliCompress } = require('node:zlib')

//Security test request intercept
test('Verification Network test by altering the non-existed order', async ({ browser }) => {

    const context = await browser.newContext()
    const page = await context.newPage()
    const username = "6orwy@gmail.com"
    const password = "Test@12pass"

    //page.route('**/*.css', route => route.abort())  // This will block the css
    page.route('**/*{jpg,png,jpeg}', route => route.abort()) // This will block the jpg, png and jpeg

    page.on('request', request => console.log(request.url()))
    page.on('response', response => console.log(response.url(), response.status())) //This prints the API response with status code

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill(username)
    await page.getByPlaceholder('enter your passsword').fill(password);
    await page.getByRole('button', { name: 'login' }).click();

    await page.locator('button:has-text("ORDERS")').click()
    await page.waitForLoadState('networkidle')

    //Altering the API with invalid order id to ensure the security test
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*', route => {
        route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a073bcf965c23b43b1cbf69" })
    })
    await page.locator('button:has-text("view")').first().click()
    await expect(page.locator('.blink_me')).toHaveText('You are not authorize to view this order')

})
