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

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e7]: GREENKART
      - link "Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire" [ref=e8] [cursor=pointer]:
        - /url: https://techsmarthire.com/
  - generic [ref=e13]:
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]:
          - generic [ref=e17]: "Page size:"
          - combobox "Page size:" [ref=e18]:
            - option "5" [selected]
            - option "10"
            - option "20"
        - generic [ref=e19]:
          - generic [ref=e20]: "Search:"
          - searchbox "Search:" [ref=e21]: Wheat
      - list "Pagination" [ref=e23]:
        - listitem:
          - button "First" [disabled]
        - listitem:
          - button "Previous" [disabled]
        - listitem [ref=e24]:
          - button "1 (current)" [ref=e25] [cursor=pointer]:
            - text: "1"
            - generic [ref=e26]: (current)
        - listitem [ref=e27]:
          - button "2" [ref=e28] [cursor=pointer]
        - listitem [ref=e29]:
          - button "3" [ref=e30] [cursor=pointer]
        - listitem [ref=e31]:
          - button "4" [ref=e32] [cursor=pointer]
        - listitem [ref=e33]:
          - button "Next" [ref=e34] [cursor=pointer]
        - listitem [ref=e35]:
          - button "Last" [ref=e36] [cursor=pointer]
    - 'table "Sorted by name: descending order" [ref=e37]':
      - alert [ref=e38]: "Sorted by name: descending order"
      - rowgroup [ref=e39]:
        - 'row "Veg/fruit name: activate to sort column ascending Price: activate to sort column ascending Discount price: activate to sort column ascending" [ref=e40]':
          - 'columnheader "Veg/fruit name: activate to sort column ascending" [ref=e41] [cursor=pointer]': Veg/fruit name
          - 'columnheader "Price: activate to sort column ascending" [ref=e43] [cursor=pointer]': Price
          - 'columnheader "Discount price: activate to sort column ascending" [ref=e44] [cursor=pointer]': Discount price
      - rowgroup [ref=e45]:
        - row "Wheat 67 28" [ref=e46]:
          - cell "Wheat" [ref=e47]
          - cell "67" [ref=e48]
          - cell "28" [ref=e49]
        - row "Tomato 37 26" [ref=e50]:
          - cell "Tomato" [ref=e51]
          - cell "37" [ref=e52]
          - cell "26" [ref=e53]
        - row "Strawberry 23 15" [ref=e54]:
          - cell "Strawberry" [ref=e55]
          - cell "23" [ref=e56]
          - cell "15" [ref=e57]
        - row "Rice 37 46" [ref=e58]:
          - cell "Rice" [ref=e59]
          - cell "37" [ref=e60]
          - cell "46" [ref=e61]
        - row "Potato 34 22" [ref=e62]:
          - cell "Potato" [ref=e63]
          - cell "34" [ref=e64]
          - cell "22" [ref=e65]
  - generic [ref=e66]:
    - generic [ref=e67]: Delivery Date
    - generic [ref=e69]:
      - generic [ref=e70]:
        - generic [ref=e71]: "0"
        - spinbutton [ref=e72]: "7"
        - generic [ref=e73]: /
        - spinbutton [ref=e74]: "12"
        - generic [ref=e75]: /
        - spinbutton [ref=e76]: "2002"
      - button [ref=e77] [cursor=pointer]:
        - img [ref=e78]
      - button [ref=e81] [cursor=pointer]:
        - img [ref=e82]
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