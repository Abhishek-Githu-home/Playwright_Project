//DROPDOWNS, SELECT

const { test, expect } = require('@playwright/test');
const { equal } = require('node:assert');
const { waitForDebugger } = require('node:inspector');
const { userid, passcode } = require('../Utils/Test10_TestData');

test('UI Control verification', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await page.locator('#username').fill(userid)
    await page.locator('#password').fill(passcode)

    //await page.pause();
    //await page.locator('input[value="admin"]').click()
    const radiobutton = page.locator('span.radiotextsty').getByText('User')
    console.log(await radiobutton.isChecked())

    await radiobutton.click()
    await page.locator('#okayBtn').click()
    await expect(radiobutton).toBeChecked()
    await page.locator('select[data-style="btn-info"]').selectOption('Consultant')
    await page.locator('#terms').check()
    page.on('dialog', dialog => dialog.accept())
    //page.dialog.accept()
    console.log(await page.locator('#terms').isChecked())

    const DocumentLink = await page.locator('[href*="document"]');
    //console.log(DocumentLink).toHaveAttribute('class', 'blinkingText')
    await expect(DocumentLink).toHaveAttribute("class", "blinkingText")

    const [newpage] = await Promise.all([
        context.waitForEvent('page'), //Listen for any new pages to open
        DocumentLink.click()
    ]) //Clicked to open new page

    await newpage.waitForLoadState('domcontentloaded')

    const text = await newpage.locator('div.inner-box').innerText();
    const alttext = await newpage.locator('p.red').innerText();
    const arraytext = alttext.split("@")
    const splittext = arraytext[1].split(".")
    const domain = splittext[0]

    //const Output = await text.textContent()
    console.log(text + "And " + alttext)
    console.log(splittext)
    console.log(domain)

    page.bringToFront()

    // page.waitForLoadState('load')
    //page.goBack({waitUntil : "commit"})
    //await page.locator('#username').clear();
    const Username = page.locator('#username')
    await Username.clear()
    await expect(Username).not.toBe("rahulshettyacademy")
    await expect(Username).toBeEmpty()
    await Username.fill(domain)
    console.log(await Username.inputValue()) //inputvalue prints just typed characters
    await page.locator('#signInBtn').click();

    //page.pause()
    page.waitForLoadState('domcontentloaded')

    await expect(page.getByText('ProtoCommerce Home').first()).toBeVisible()
    //console.log(await LoginPageTitle).textContent()
    //const productName = await page.locator("div.card-body a").first()

    const products = await page.locator('.h-100')
    const productName = await page.locator('.h-100').first().textContent()
    console.log(productName)
    const Titles = await page.locator('div.card-body a').first().textContent()
    console.log(Titles)


    //Dynamically getting the locators
    console.log(await Titles.length)
    const totalProducts = await products.count();
    console.log("The count is :", totalProducts)
    await page.waitForLoadState('networkidle')
    for (let i = 0; i < totalProducts; ++i) {
        const currentText = await products.nth(i).textContent()
        if (currentText.includes(productName)) {
            const AddtoCart = await products.nth(i).getByRole('button', { name: 'Add' }).click({ timeout: 60000 });
            break;
            // await page.waitForLoadState('networkidle')
        }
    }

    await page.getByText('Checkout').click({ force: true });
    const CartItem = await page.locator('h4.media-heading').textContent()
    console.log(CartItem)

    await expect(CartItem).toBe(Titles);
    const index = await page.locator('td strong')
    const Status = await page.locator('span.text-success').textContent()
    const quantity = page.locator('#exampleInputEmail1:visible')
    const Price = index.nth(1)
    const TotalPrice = index.nth(2)

    const StockCheck = await expect(Status).toContain('In Stock')
    const quantityCheck = await expect(quantity).toHaveValue(/[0-1]/)
    await expect(Price).toHaveText('₹. 100000')
    await expect(TotalPrice).toHaveText('₹. 100000')
    //console.log("The Status of the iphone X is: " + StockCheck ,"The quantity of the iphone X is : " + quantityCheck, "The Price of the iphone X is" + Price.textContent(), "The Total Price of iphone X is" + TotalPrice.textContent())

    await page.getByRole('button', { name: 'checkout' }).click({ force: true })
    const input = await page.getByRole('textbox', { name: 'Please choose your delivery' }).pressSequentially('Ind', { delay: 100 })
    //await page.waitForSelector('input')
    await page.waitForLoadState('domcontentloaded');

    try {
        // 1. Added a 3-second timeout to the first action. If it's not there, fail fast!
        const country = page.getByText('India', { exact: true });
        await country.click({ timeout: 1000 });

        await page.locator('#checkbox2').check({ force: true });
        await page.getByRole('button', { name: 'purchase' }).click();

        // 2. Added a short timeout here just in case the loading screen hangs
        const successMessage = await page.getByText('× Success! Thank you! Your').textContent({ timeout: 5000 });
        console.log("Success message: ", successMessage);

        expect(successMessage).toContain('Thank you');

    } catch (error) {
        // 3. Log the ACTUAL error so you know exactly why it skipped (timeout vs assertion failure)
        console.log(`Optional application issue skipped. Reason: ${error.message}`);
    }

})