const { test, expect } = require("@playwright/test");

test('Verification of title', async({ page }) => {    

    //const Context = await browser.newContext();
    //const page = await Context.newPage();
    const URL = "https://rahulshettyacademy.com/client/#/auth/login"
    const Title = page.locator('h1.login-title')
    const Random_Generator = Math.random().toString(36).slice(2, 7 )
    const phone_num_generator = Math.random().toString(10).slice(2,12)
    const Firstname = page.locator('#firstName')
    const Lastname = page.locator('#lastName')
    const Email = page.locator('input[placeholder="email@example.com"]')
    const Mobile_Number = page.locator('input[formcontrolname="userMobile"]')
    const Role = page.locator('select.custom-select')
    const Gender = page.locator('input[value="Male"]')
    const Password = page.locator('#userPassword')
    const Confirm_Password = page.locator('#confirmPassword')
    const consent = page.locator('input[formcontrolname="required"]')
    const register = page.locator('input.login-btn')

    await page.goto(URL)
    await page.locator('a.text-reset').click()
    const RegisterTitle = await Title.textContent()
    console.log(await RegisterTitle)

    await Firstname.fill(Random_Generator + "Fname")
    await Lastname.fill(Random_Generator + "Lname")
    await Email.fill(Random_Generator + "@gmail.com")
    await Mobile_Number.fill(phone_num_generator)
    await Role.selectOption("Engineer")
    await Gender.click()
    await Password.fill("Test@12pass")
    await Confirm_Password.fill("Test@12pass")
    await consent.check()

    await register.click()
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/auth/register')
    //await page.locator('h1.headcolor').toHaveText("Account Created Successfully")
    await expect(page.locator('h1.headcolor')).toHaveText("Account Created Successfully", { timeout : 13000 })

    await page.getByText('Login').click() 
    //await page.waitForLoadState('networkidle')

    const GMAIL = Random_Generator + "@gmail.com"

    await page.locator('#userEmail').fill(GMAIL)
    await page.locator('#userPassword').fill("Test@12pass")
    await page.locator('input[value="Login"]').click()

    await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/dash", {timeout : 10000})
    const Item = await page.locator('div.card').first().allTextContents()
    console.log(Item)

    




})