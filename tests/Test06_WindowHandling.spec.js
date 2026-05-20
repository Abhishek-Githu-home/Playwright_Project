const{test, expect} = require('@playwright/test');

test('Verification of handling the windows', async({ browser }) => {

    const Context = await browser.newContext()
    const page = await Context.newPage()

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await expect(page).toHaveTitle('Practice Page')

    //await page.getByRole('button', {name: 'Open Window'}).click()
    await page.locator('#alertbtn').click()

    page.on('dialog',dialog => dialog.accept())

    await page.locator('//input[@value="Confirm"]').click()
    const Mousehovering = await page.getByRole('button', {name : 'Mouse Hover'}).hover()
    await page.getByRole('link', { name: 'Top' }).click()

    const Iframe = page.frameLocator('#courses-iframe') // Iframe
    await Iframe.locator('li a[href*="lifetime-access"]').first().click()
    const Value = await Iframe.locator('div h2').filter({ hasText : " Happy Subscibers!" }).innerText()
    console.log(Value.split(" ")[1])

    
})