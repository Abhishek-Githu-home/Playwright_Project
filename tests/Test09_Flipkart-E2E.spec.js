const { test, expect} = require('@playwright/test')

test.describe(' @E2E Verification of E2E order placing functionality', async() => {

    test('Verification of login scenario for Flipkart website', async({browser}) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    const searchoption = 'Mobile 5g'

    await page.goto('https://www.flipkart.com/')
    

})
})
