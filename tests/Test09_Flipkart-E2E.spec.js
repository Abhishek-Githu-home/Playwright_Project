const { test, expect} = require('@playwright/test')

test.describe('Verification of E2E order placing functionality', async() => {

    test('Verification of login scenario for Flipkart website', async({browser}) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    const searchoption = 'Mobile 5g'

    await page.goto('https://www.flipkart.com/')
    await expect(page).toHaveTitle('Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!')

    //page.on('dialog', dialog => dialog.reject())
    await page.getByRole('button', {name: '✕'}).click()

    const search = await page.locator('//input[@title="Search for Products, Brands and More"]').first().fill(searchoption)
    await page.press('enter')
    await page.getByTitle('Apple').check()

    await expect(page.locator('.jIjQ8S')).toHaveCount(24)
    await page.getByTestId("MOBHFN6YNAG4ZTHS").filter({hasText : "Apple iPhone 17 (Sage, 256 GB)"}).textContent()
    

})
})
