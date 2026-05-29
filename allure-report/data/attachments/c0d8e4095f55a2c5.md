# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Test07_ApiHandling.spec.js >> Verify the API testing - 01
- Location: tests\Test07_ApiHandling.spec.js:31:1

# Error details

```
Test timeout of 10000ms exceeded.
```

```
Error: locator.textContent: Test timeout of 10000ms exceeded.
Call log:
  - waiting for locator('div.card-body').first()

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e7]: Ecom
      - generic [ref=e9]:
        - link " dummywebsite@rahulshettyacademy.com" [ref=e11] [cursor=pointer]:
          - /url: emailto:dummywebsite@rahulshettyacademy.com
          - generic [ref=e12]: 
          - text: dummywebsite@rahulshettyacademy.com
        - generic [ref=e13]:
          - link "" [ref=e14] [cursor=pointer]:
            - /url: "#"
            - generic [ref=e15]: 
          - link "" [ref=e16] [cursor=pointer]:
            - /url: "#"
            - generic [ref=e17]: 
          - link "" [ref=e18] [cursor=pointer]:
            - /url: "#"
            - generic [ref=e19]: 
          - link "" [ref=e20] [cursor=pointer]:
            - /url: "#"
            - generic [ref=e21]: 
  - generic [ref=e22]:
    - generic [ref=e23]:
      - heading "We Make Your Shopping Simple" [level=3]
      - heading "Practice Website for Rahul Shetty Academy Students" [level=1] [ref=e24]:
        - text: Practice Website for
        - emphasis [ref=e25]: Rahul Shetty Academy
        - text: Students
      - link "Register" [ref=e26] [cursor=pointer]:
        - /url: "#/auth/register"
    - generic [ref=e28]:
      - paragraph [ref=e29]:
        - generic [ref=e30]: Register to sign in with your personal account
      - generic [ref=e31]:
        - heading "Log in" [level=1] [ref=e32]
        - generic [ref=e33]:
          - generic [ref=e34]:
            - generic [ref=e35]: Email
            - textbox "email@example.com" [ref=e36]
          - generic [ref=e37]:
            - generic [ref=e38]: Password
            - textbox "enter your passsword" [ref=e39]
          - button "Login" [ref=e40] [cursor=pointer]
        - link "Forgot password?" [ref=e41] [cursor=pointer]:
          - /url: "#/auth/password-new"
        - paragraph [ref=e42] [cursor=pointer]: Don't have an account? Register here
  - generic [ref=e43]:
    - heading "Why People Choose Us?" [level=1] [ref=e46]
    - generic [ref=e47]:
      - generic [ref=e48]:
        - generic [ref=e50]: 
        - generic [ref=e51]:
          - heading "3546540" [level=1]
          - paragraph [ref=e52]: Successfull Orders
      - generic [ref=e53]:
        - generic [ref=e55]: 
        - generic [ref=e56]:
          - heading "37653" [level=1]
          - paragraph [ref=e57]: Customers
      - generic [ref=e58]:
        - generic [ref=e60]: 
        - generic [ref=e61]:
          - heading "3243" [level=1]
          - paragraph [ref=e62]: Sellers
    - generic [ref=e63]:
      - generic [ref=e64]:
        - generic [ref=e66]: 
        - generic [ref=e67]:
          - heading "4500+" [level=1]
          - paragraph [ref=e68]: Daily Orders
      - generic [ref=e69]:
        - generic [ref=e71]: 
        - generic [ref=e72]:
          - heading "500+" [level=1]
          - paragraph [ref=e73]: Daily New Customer Joining
```

# Test source

```ts
  1  | const{ test, expect, request } = require('@playwright/test');
  2  | const { it } = require('node:test');
  3  | const invalidpayload = {userEmail:"Abhiapitest@gmail.com",userPassword:"Abhi@1272"};
  4  | const validpayload = {userEmail:"6orwy@gmail.com",userPassword:"Test@12pass"}
  5  | 
  6  | //declare the request which will exposes the API
  7  | let token;
  8  | test.beforeAll(async () => {
  9  | 
  10 |     const APIContext = await request.newContext();
  11 |     const NegativeLoginresponse = await APIContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
  12 |         data: invalidpayload
  13 |     })
  14 |     expect(NegativeLoginresponse.ok()).toBeFalsy(); //incorrect email address - 404 status code
  15 |     const NegativeloginresponseJSON = await NegativeLoginresponse.json();
  16 | 
  17 | })
  18 | 
  19 | test.beforeAll(async() => {
  20 | 
  21 |     const APIContext = await request.newContext()
  22 |     const PositiveLogin = await APIContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
  23 |         data: validpayload
  24 |     })
  25 |     expect(PositiveLogin.ok()).toBeTruthy(); // valid credentials - 200 status code
  26 |     const positiveValidloginJSON = await PositiveLogin.json();
  27 |     token = positiveValidloginJSON.token;
  28 | })
  29 | 
  30 | //test.describe.configure({mode : 'parallel'})
  31 | test('Verify the API testing - 01', async ({page}) => {
  32 | 
  33 |     console.log("The login token is : " , token)
  34 | 
  35 |     page.addInitScript(value => { // addInitScript helps to inject the globally scoped into local
  36 |         window.localStorage.setItem('token', value)
  37 |     }, token );
  38 | 
  39 |     await page.goto('https://rahulshettyacademy.com/client/')
  40 |     await page.waitForLoadState('networkidle')
  41 |     //await expect(page.locator('.blink_me')).toHaveText('User can only see maximum 9 products on a page')
> 42 |     await page.locator('div.card-body').first().textContent()
     |                                                 ^ Error: locator.textContent: Test timeout of 10000ms exceeded.
  43 |     await page.locator('a[href*=qasummit]').allTextContents()
  44 |     const item = await page.locator('h5 b').nth(1).allTextContents()
  45 |     console.log(item)
  46 | 
  47 | })
  48 | 
  49 | test.skip('Verify the API testing - 02', async ({page}) => {
  50 | 
  51 |     console.log("The login token is : " , token)
  52 | 
  53 |     page.addInitScript(value => { // addInitScript helps to inject the globally scoped into local
  54 |         window.localStorage.setItem('token', value)
  55 |     }, token );
  56 | 
  57 |     await page.goto('https://rahulshettyacademy.com/client/')
  58 |     await page.waitForLoadState('networkidle')
  59 |     await expect(page.locator('.blink_me')).toHaveText('User can only see maximum 9 products on a page')
  60 |     await page.locator('div.card-body').first().textContent()
  61 |     await page.locator('a[href*=qasummit]').allTextContents()
  62 |     const item = await page.locator('h5 b').nth(1).allTextContents()
  63 |     console.log(item)
  64 | 
  65 | })
  66 | 
  67 | 
  68 | 
```