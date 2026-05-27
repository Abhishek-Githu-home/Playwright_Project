//DROPDOWNS, SELECT

const { test, expect } = require('@playwright/test');
const { equal } = require('node:assert');
const { waitForDebugger } = require('node:inspector');

test.skip('UI Control verification', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await page.locator('#username').fill("rahulshettyacademy")
    await page.locator('#password').fill("Learning@830$3mK2")

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
            const AddtoCart = await products.nth(i).getByRole('button', { name: 'Add' }).click({timeout : 60000});
            break;
           // await page.waitForLoadState('networkidle')
        }
    }

    await page.getByText('Checkout').click({force: true});
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

    await page.getByRole('button', { name : 'checkout'}).click({force:true})
    const input = await page.getByRole('textbox', { name: 'Please choose your delivery' }).pressSequentially('Ind', {delay : 100})
    //await page.waitForSelector('input')
    await page.waitForLoadState('domcontentloaded');
    
    const country = page.getByText('India', {exact : true})
    await country.click()

    //await page.locator('div.checkbox-primary').check({force : true})
    await page.locator('#checkbox2').check({force : true})
    await page.getByRole('button', {name : 'purchase'}).click()
    const successMessage = await page.getByText('× Success! Thank you! Your').textContent();
    console.log(successMessage)
    expect(successMessage).toContain('Thank you');




})