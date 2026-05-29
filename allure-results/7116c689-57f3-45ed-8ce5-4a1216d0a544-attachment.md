# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Test14_FileUpload.spec.js >> Verification of file modify and upload functionality
- Location: tests\Test14_FileUpload.spec.js:41:1

# Error details

```
Error: File not found: Mango
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - 'heading "RAHUL SHETTY ACADEMY PRACTISE Note: Data will be reset after page refresh." [level=1] [ref=e6]':
      - text: RAHUL SHETTY ACADEMY PRACTISE
      - generic [ref=e7]: "Note: Data will be reset after page refresh."
  - generic [ref=e8]:
    - table [ref=e11]:
      - rowgroup [ref=e12]:
        - row "S No ▲ Fruit Name ▲ Color ▲ Price ▲ Season ▲" [ref=e13]:
          - columnheader "S No ▲" [ref=e15] [cursor=pointer]:
            - generic [ref=e16]: S No
            - generic [ref=e17]: ▲
          - columnheader "Fruit Name ▲" [ref=e19] [cursor=pointer]:
            - generic [ref=e20]: Fruit Name
            - generic [ref=e21]: ▲
          - columnheader "Color ▲" [ref=e23] [cursor=pointer]:
            - generic [ref=e24]: Color
            - generic [ref=e25]: ▲
          - columnheader "Price ▲" [ref=e27] [cursor=pointer]:
            - generic [ref=e28]: Price
            - generic [ref=e29]: ▲
          - columnheader "Season ▲" [ref=e31] [cursor=pointer]:
            - generic [ref=e32]: Season
            - generic [ref=e33]: ▲
      - rowgroup [ref=e34]:
        - row "1 Mango Yellow 299 Summer" [ref=e35]:
          - cell "1" [ref=e36]:
            - generic [ref=e37]: "1"
          - cell "Mango" [ref=e38]:
            - generic [ref=e39]: Mango
          - cell "Yellow" [ref=e40]:
            - generic [ref=e41]: Yellow
          - cell "299" [ref=e42]:
            - generic [ref=e43]: "299"
          - cell "Summer" [ref=e44]:
            - generic [ref=e45]: Summer
        - row "2 Apple Red 345 Winter" [ref=e46]:
          - cell "2" [ref=e47]:
            - generic [ref=e48]: "2"
          - cell "Apple" [ref=e49]:
            - generic [ref=e50]: Apple
          - cell "Red" [ref=e51]:
            - generic [ref=e52]: Red
          - cell "345" [ref=e53]:
            - generic [ref=e54]: "345"
          - cell "Winter" [ref=e55]:
            - generic [ref=e56]: Winter
        - row "3 Papaya Orange 187 Spring" [ref=e57]:
          - cell "3" [ref=e58]:
            - generic [ref=e59]: "3"
          - cell "Papaya" [ref=e60]:
            - generic [ref=e61]: Papaya
          - cell "Orange" [ref=e62]:
            - generic [ref=e63]: Orange
          - cell "187" [ref=e64]:
            - generic [ref=e65]: "187"
          - cell "Spring" [ref=e66]:
            - generic [ref=e67]: Spring
        - row "4 Banana Yellow 69 All" [ref=e68]:
          - cell "4" [ref=e69]:
            - generic [ref=e70]: "4"
          - cell "Banana" [ref=e71]:
            - generic [ref=e72]: Banana
          - cell "Yellow" [ref=e73]:
            - generic [ref=e74]: Yellow
          - cell "69" [ref=e75]:
            - generic [ref=e76]: "69"
          - cell "All" [ref=e77]:
            - generic [ref=e78]: All
        - row "5 Kivi Green 399 Winter" [ref=e79]:
          - cell "5" [ref=e80]:
            - generic [ref=e81]: "5"
          - cell "Kivi" [ref=e82]:
            - generic [ref=e83]: Kivi
          - cell "Green" [ref=e84]:
            - generic [ref=e85]: Green
          - cell "399" [ref=e86]:
            - generic [ref=e87]: "399"
          - cell "Winter" [ref=e88]:
            - generic [ref=e89]: Winter
        - row "6 Orange Orange 199 Summer" [ref=e90]:
          - cell "6" [ref=e91]:
            - generic [ref=e92]: "6"
          - cell "Orange" [ref=e93]:
            - generic [ref=e94]: Orange
          - cell "Orange" [ref=e95]:
            - generic [ref=e96]: Orange
          - cell "199" [ref=e97]:
            - generic [ref=e98]: "199"
          - cell "Summer" [ref=e99]:
            - generic [ref=e100]: Summer
    - navigation [ref=e102]:
      - generic [ref=e103]: "Rows per page:"
      - generic [ref=e104]:
        - combobox "Rows per page:" [ref=e105] [cursor=pointer]:
          - option "10" [selected]
          - option "15"
          - option "20"
          - option "25"
          - option "30"
        - img
      - generic [ref=e106]: 1-6 of 6
      - generic [ref=e107]:
        - button "First Page" [disabled] [ref=e108]:
          - img [ref=e109]
        - button "Previous Page" [disabled] [ref=e112]:
          - img [ref=e113]
        - button "Next Page" [disabled] [ref=e116]:
          - img [ref=e117]
        - button "Last Page" [disabled] [ref=e120]:
          - img [ref=e121]
  - generic [ref=e125]:
    - button "Download" [active] [ref=e126] [cursor=pointer]
    - button "Choose File" [ref=e127]
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test')
  2  | import ExcelJS from 'exceljs';
  3  | import path from 'node:path';
  4  | 
  5  | //Create one unified function that accepts the exact parameters you need
  6  | async function ReadExcelTest(filepath, searchtext, replacetext) {
  7  |     let output = { row: -1, column: -1 }
  8  |     const Workbook = new ExcelJS.Workbook();
> 9  |     await Workbook.xlsx.readFile(filepath)
     |     ^ Error: File not found: Mango
  10 |     const Worksheet = Workbook.getWorksheet('Sheet1');
  11 |     await new Promise(resolve => setTimeout(resolve, 500));
  12 |     Worksheet.eachRow((row, rowNumber) => {
  13 |         row.eachCell((cell, colomnNumber) => {
  14 |             //console.log(cell.value)
  15 |             if (cell.value == searchtext) {
  16 |                 output.row = rowNumber
  17 |                 output.column = colomnNumber
  18 |             }
  19 |         })
  20 |     })
  21 |     if (output.row !== -1 && output.column !== -1) {
  22 |         const cell = Worksheet.getCell(output.row, output.column);
  23 | 
  24 |         // Use the dynamic replaceText variable
  25 |         cell.value = replacetext;
  26 | 
  27 |         // 5. Write the file ONCE
  28 |         await Workbook.xlsx.writeFile(filepath);
  29 |         console.log(`Successfully replaced "${searchtext}" with "${replacetext}" at Row: ${output.row}, Col: ${output.column}`);
  30 |     } else {
  31 |         console.log(`Error: Could not find "${searchtext}" in the document.`);
  32 |     }
  33 | }
  34 | 
  35 | const excelFilePath = '/Users/abhis/Downloads/download.xlsx';
  36 | 
  37 | // Call the function with your specific parameters
  38 | //ReadExcelTest(excelFilePath, "Mango", "CHERRY");
  39 | 
  40 | 
  41 | test('Verification of file modify and upload functionality', async ({ page }) => {
  42 | 
  43 |     //const Context = await browser.newContext()
  44 |     //const page = await Context.newPage()
  45 |     const filepath = path.join('C:', 'Users', 'abhis', 'Downloads', 'download.xlsx');
  46 |     const textsearch = 'Mango'
  47 |     const updatedvalue = "350"
  48 | 
  49 |     await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html')
  50 |     const downloadcheck = page.waitForEvent('download')
  51 |     await page.getByRole('button', { name: 'Download' }).click()
  52 |     const download = await downloadcheck;
  53 |     //await page.pause()
  54 |     await download.saveAs(filepath)
  55 | 
  56 |     const name = page.getByText('Mango')
  57 |     const rowname = page.getByRole('row').filter({ has: name })
  58 |     console.log("The mango Price is : ", await rowname.locator('#cell-4-undefined').textContent())
  59 | 
  60 |     //Some issue with Application - Not working
  61 |     await ReadExcelTest(textsearch.trim(), updatedvalue, { rowChange: 0, colChange: 2 }, filepath)
  62 |     //await page.locator('#fileinput').click()
  63 |     await page.locator('#fileinput').setInputFiles(filepath)
  64 | 
  65 | 
  66 | 
  67 | 
  68 | })
```