//run and screenshot store -> run again and take new screenshot -> match it with previous screenshot 

const {test, expect} = require('@playwright/test')

test.only('Verification of UI screens - visual testing', async({browser}) => {

    const Context = await browser.newContext()
    const page = await Context.newPage()

    await page.goto('https://www.google.com/webhp');
    expect(await page.screenshot()).toMatchSnapshot('google.png');

    await page.goto('https://dayspedia.com/time/online/');
    //await page.waitForTimeout(5000)
    expect(await page.screenshot()).toMatchSnapshot('clock.png')
})

