const { chromium } = require('@playwright/test')
const { Before, After, AfterStep, Status } = require('@cucumber/cucumber')
const { POM2_EventCreation } = require('../../Pageobjects/POM2_EventCreation.js')
const { POM3_EventBooking } = require('../../Pageobjects/POM3_EventBooking.js')
const { POM4_EventDetails } = require('../../Pageobjects/POM4_EventDetails.js')
const { POM5_EventDeletion } = require('../../Pageobjects/POM5_EventDeletion.js')
const TestData = require('../../Utils/Test10_TestData')

Before(async function() {
    const { EventName, customerName, customerEmail, customerNumber } = TestData
    const browser = await chromium.launch({ headless: false })
    const context = await browser.newContext()
    const page = await context.newPage()

    this.browser = browser
    this.page = page
    this.EventCreationpage = new POM2_EventCreation(page)
    this.EventBookingpage = new POM3_EventBooking(page)
    this.EventDetails = new POM4_EventDetails(page)
    this.EventDeletion = new POM5_EventDeletion(page)
    this.EventName = EventName
    this.customerName = customerName
    this.customerEmail = customerEmail
    this.customerNumber = customerNumber

    
})

After(async function() {
    if (this.browser) {
        await this.browser.close()
    }
})

AfterStep(async function(result) {
    if (result.status === Status.FAILED && this.page) {
        await this.page.screenshot({ path: '../TestEvidences/FailedScreenshot.png' })
    }
})