const {test, expect, request } = require('@playwright/test')
const path = require('node:path')

test('Positive flow for E2E eCommerce order placing', async ({browser}) => {

    const context = await browser.newContext()
    const page = await context.newPage()
    page.on('request', request => console.log(request.url()))
    page.on('response', response => console.log(response.url, response.status()))

    await page.goto('https://rahulshettyacademy.com/angularpractice/')
    console.log(await page.getByRole('link', { name: 'ProtoCommerce' }).textContent())

    await page.locator('//input[@name="name"]').first().fill('testing')
    //await page.getByRole('textbox', {name : 'name'}).first().fill('Testing')
    await page.locator('//input[@name="email"]').fill('test@gmail.com')
    await page.getByPlaceholder('Password').fill('TestingPassword')
    const mycheckbox = page.getByLabel('Check me out if you Love IceCreams!')
    await mycheckbox.check()
    await expect(mycheckbox).toBeChecked()

    await page.getByLabel('Gender').selectOption('Female')
    await expect(page.getByLabel('Entrepreneur (disabled)')).toBeDisabled()
    const EmploymentStatus = page.getByLabel('Student')
    await EmploymentStatus.check()
    const SelectedStatus = await EmploymentStatus.isChecked()
    console.log(SelectedStatus)

    await page.locator('//input[@name="bday"]').pressSequentially('11-11-1111')
    //await page.getByText('Two-way Data Binding example: ').fill('Testing')

    await page.getByRole('button', {name : 'submit'}).click()
    await page.waitForLoadState('networkidle')
    
    //const SuccessMessage = await page.getByTestId("alert").textContent()
    
    const SuccessMessage = await page.getByText('× Success! The Form has been').textContent()
    console.log(SuccessMessage)
    expect(SuccessMessage).toContain('Success')

    
    await page.getByRole('link', {name:"shop"}).click()
    await page.screenshot({path : '../TestEvidences/shoppage.png'})
    await page.waitForURL("https://rahulshettyacademy.com/angularpractice/shop")

    await page.locator('app-card').filter( {hasText: "Blackberry"} ).getByRole('button', {name:"Add "}).click()
    await page.locator('app-card').filter( {hasNotText : "Iphone"} ).filter( {hasNotText : "Blackberry"} ).filter({hasNotText : "Nokia" }).getByRole('button', {name: 'Add '}).click()

    await page.getByText('Checkout').click()

    const SamsungNote = page.getByRole('heading', { name: 'Samsung Note' })
    await SamsungNote.isVisible()
    await SamsungNote.screenshot({path : '../TestEvidences/SamsungNote.png'})

    const Blackberry = page.getByRole('heading', { name: 'Blackberry' })
    await Blackberry.isVisible()
    await Blackberry.screenshot({path : '../TestEvidences/blackberry.png'})
    await page.getByText('Checkout').click()
    await page.locator('#country').pressSequentially('India')
    await page.getByText('India', {exact : true}).click()
    await page.locator('#checkbox2').check({force : true})
    await page.locator('//input[@value="Purchase"]').click()
    //await page.pause()

    const successmsg = page.locator('.alert-success')
    console.log(successmsg)
    await expect(successmsg).toContainText("Success! Thank you! Your order will be delivered in next few weeks")
})