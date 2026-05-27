const{ test, expect, request } = require('@playwright/test');
const { it } = require('node:test');
const invalidpayload = {userEmail:"Abhiapitest@gmail.com",userPassword:"Abhi@1272"};
const validpayload = {userEmail:"6orwy@gmail.com",userPassword:"Test@12pass"}

//declare the request which will exposes the API
let token;
test.beforeAll(async () => {

    const APIContext = await request.newContext();
    const NegativeLoginresponse = await APIContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
        data: invalidpayload
    })
    expect(NegativeLoginresponse.ok()).toBeFalsy(); //incorrect email address - 404 status code
    const NegativeloginresponseJSON = await NegativeLoginresponse.json();

})

test.beforeAll(async() => {

    const APIContext = await request.newContext()
    const PositiveLogin = await APIContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
        data: validpayload
    })
    expect(PositiveLogin.ok()).toBeTruthy(); // valid credentials - 200 status code
    const positiveValidloginJSON = await PositiveLogin.json();
    token = positiveValidloginJSON.token;
})

test.describe.configure({mode : 'parallel'})
test('Verify the API testing - 01', async ({page}) => {

    console.log("The login token is : " , token)

    page.addInitScript(value => { // addInitScript helps to inject the globally scoped into local
        window.localStorage.setItem('token', value)
    }, token );

    await page.goto('https://rahulshettyacademy.com/client/')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('.blink_me')).toHaveText('User can only see maximum 9 products on a page')
    await page.locator('div.card-body').first().textContent()
    await page.locator('a[href*=qasummit]').allTextContents()
    const item = await page.locator('h5 b').nth(1).allTextContents()
    console.log(item)

})

test('Verify the API testing - 02', async ({page}) => {

    console.log("The login token is : " , token)

    page.addInitScript(value => { // addInitScript helps to inject the globally scoped into local
        window.localStorage.setItem('token', value)
    }, token );

    await page.goto('https://rahulshettyacademy.com/client/')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('.blink_me')).toHaveText('User can only see maximum 9 products on a page')
    await page.locator('div.card-body').first().textContent()
    await page.locator('a[href*=qasummit]').allTextContents()
    const item = await page.locator('h5 b').nth(1).allTextContents()
    console.log(item)

})
test('Verify the API testing -03', async ({page}) => {

    console.log("The login token is : " , token)

    page.addInitScript(value => { // addInitScript helps to inject the globally scoped into local
        window.localStorage.setItem('token', value)
    }, token );

    await page.goto('https://rahulshettyacademy.com/client/')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('.blink_me')).toHaveText('User can only see maximum 9 products on a page')
    await page.locator('div.card-body').first().textContent()
    await page.locator('a[href*=qasummit]').allTextContents()
    const item = await page.locator('h5 b').nth(1).allTextContents()
    console.log(item)

})
test('Verify the API testing - 04', async ({page}) => {

    console.log("The login token is : " , token)

    page.addInitScript(value => { // addInitScript helps to inject the globally scoped into local
        window.localStorage.setItem('token', value)
    }, token );

    await page.goto('https://rahulshettyacademy.com/client/')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('.blink_me')).toHaveText('User can only see maximum 9 products on a page')
    await page.locator('div.card-body').first().textContent()
    await page.locator('a[href*=qasummit]').allTextContents()
    const item = await page.locator('h5 b').nth(1).allTextContents()
    console.log(item)

})

