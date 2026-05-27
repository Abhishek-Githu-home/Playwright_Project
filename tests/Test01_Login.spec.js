const { test, expect } = require('@playwright/test');

test('@E2E First playwright test', async ({ browser }) => { //async - helps to wait
    //This will launch the new browser instance

    const context = await browser.newContext();
    const page = await context.newPage();

    const username = page.locator('#username')
    const password = page.locator('input[type="password"]')
    const Sign_in = page.locator('input[value="Sign In"]')

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/") // Since JS is asynchronous, await helps to be in sync execution explicitly
    console.log(await page.title())
    // supports css(predominantly) and xpath selectors

    await username.fill("rahulshettyacad") //type is being depricated, use fill to enter
    await password.fill('Learning@830$3mK2')
    await Sign_in.click()

    console.log(await page.locator('[style*="block"]').textContent())
    await expect(page.locator('[style*="block"]')).toContainText("Incorrect")

});

test('Second Page testcase', async ({ page }) => { //test.only helps to run only specific case
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

    const username = page.locator('#username')
    const password = page.locator('input[type="password"]')
    const Sign_in = page.locator('input[value="Sign In"]')
    const AddButton = page.locator('button.btn')
    const Header = page.locator('h4.card-title')


    console.log(await page.title())
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    await username.fill("rahulshettyacademy") //type is being depricated, use fill to enter
    await password.fill('Learning@830$3mK2')
    await Sign_in.click()

    console.log(await Header.nth(0).textContent()) // nth(0) and first() is same
    console.log(await Header.last().textContent()) // last() element

    await AddButton.first().click()
    await AddButton.last().click()
    const AllTitle = await Header.allTextContents() //Grabs all the title in list []
    console.log(AllTitle)

   // await expect(page.locator('button.btn').first().click())

})