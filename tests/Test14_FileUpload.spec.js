const { test, expect } = require('@playwright/test')
import ExcelJS from 'exceljs';
import path from 'node:path';

//Create one unified function that accepts the exact parameters you need
async function ReadExcelTest(filepath, searchtext, replacetext) {
    let output = { row: -1, column: -1 }
    const Workbook = new ExcelJS.Workbook();
    await Workbook.xlsx.readFile(filepath)
    const Worksheet = Workbook.getWorksheet('Sheet1');
    await new Promise(resolve => setTimeout(resolve, 500));
    Worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colomnNumber) => {
            //console.log(cell.value)
            if (cell.value == searchtext) {
                output.row = rowNumber
                output.column = colomnNumber
            }
        })
    })
    if (output.row !== -1 && output.column !== -1) {
        const cell = Worksheet.getCell(output.row, output.column);

        // Use the dynamic replaceText variable
        cell.value = replacetext;

        // 5. Write the file ONCE
        await Workbook.xlsx.writeFile(filepath);
        console.log(`Successfully replaced "${searchtext}" with "${replacetext}" at Row: ${output.row}, Col: ${output.column}`);
    } else {
        console.log(`Error: Could not find "${searchtext}" in the document.`);
    }
}

const excelFilePath = '/Users/abhis/Downloads/download.xlsx';

// Call the function with your specific parameters
//ReadExcelTest(excelFilePath, "Mango", "CHERRY");


test('Verification of file modify and upload functionality', async ({ page }) => {

    //const Context = await browser.newContext()
    //const page = await Context.newPage()
    const filepath = path.join('C:', 'Users', 'abhis', 'Downloads', 'download.xlsx');
    const textsearch = 'Mango'
    const updatedvalue = "350"

    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html')
    const downloadcheck = page.waitForEvent('download')
    await page.getByRole('button', { name: 'Download' }).click()
    const download = await downloadcheck;
    //await page.pause()
    await download.saveAs(filepath)

    const name = page.getByText('Mango')
    const rowname = page.getByRole('row').filter({ has: name })
    console.log("The mango Price is : ", await rowname.locator('#cell-4-undefined').textContent())

    //Some issue with Application - Not working
    await ReadExcelTest(textsearch.trim(), updatedvalue, { rowChange: 0, colChange: 2 }, filepath)
    //await page.locator('#fileinput').click()
    await page.locator('#fileinput').setInputFiles(filepath)




})