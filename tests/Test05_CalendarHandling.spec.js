const { test, expect } = require("@playwright/test")

test('Verification of calendar functionality', async ({browser}) => {

    const context = await browser.newContext()
    const page = await context.newPage()
    const date = '12'
    const month = '7'
    const year = '2002'
    const expectedList = [month, date, year]

    page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers')
    const Title = await page.locator('div.greenLogo').first().textContent()
    console.log(Title)

    await page.getByRole('searchbox', { name: 'Search:' }).fill('Wheat')

    await page.locator('.react-date-picker__clear-button__icon').click()
    await page.locator('.react-date-picker').click()
    await page.locator('.react-calendar__navigation__label').click()
    await page.locator('.react-calendar__navigation__label').click()
    await page.locator('.react-calendar__navigation__prev-button').dblclick()
    await page.getByRole('button', {name : year, exact : true}).click()
    const datepick = page.locator('.react-calendar__navigation__label__labelText--from')
    //await datepick.click()
    await page.locator('.react-calendar__year-view__months__month').nth(Number(month)-1).click()

    await page.locator('.react-calendar__month-view__days__day').filter({ hasText: '12' }).click()

    const inputs = page.locator('.react-date-picker__inputGroup__input')
    for(let i =0; i<expectedList.length; i++)
    {
        const value = await inputs.nth(i).inputValue();
        console.log(value)
        expect(value).toEqual(expectedList[i]);
        //or
        await expect(inputs.nth(i)).toHaveValue(expectedList[i]);
 
    }





})