# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Test13_ScreenshotValidation.spec.js >> parallel run verification
- Location: tests\Test13_ScreenshotValidation.spec.js:16:1

# Error details

```
ReferenceError: page is not defined
```

# Test source

```ts
  1  | //run and screenshot store -> run again and take new screenshot -> match it with previous screenshot 
  2  | 
  3  | const { test, expect } = require('@playwright/test')
  4  | 
  5  | 
  6  | test.describe.configure({mode : 'parallel'})
  7  | test('Verification of UI screens - visual testing', async ({ browser }) => {
  8  | 
  9  |     const Context = await browser.newContext()
  10 |     const page = await Context.newPage()
  11 | 
  12 |     await page.goto('https://www.google.com/webhp');
  13 |     expect(await page.screenshot()).toMatchSnapshot('../TestEvidences/google.png');
  14 | })
  15 | 
  16 | test('parallel run verification', async () => {
> 17 |     await page.goto('https://dayspedia.com/time/online/');
     |     ^ ReferenceError: page is not defined
  18 |     //await page.waitForTimeout(5000)
  19 |     expect(await page.screenshot()).toMatchSnapshot('../TestEvidences/clock.png')
  20 | })
  21 | 
  22 | 
```