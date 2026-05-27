const { When, Then, Given, setDefaultTimeout } = require('@cucumber/cucumber')
const { chromium } = require('@playwright/test')
const { POM1_LoginPage } = require('../../Pageobjects/POM1_LoginPage.js')
const { POM2_EventCreation } = require('../../Pageobjects/POM2_EventCreation.js')
const { POM3_EventBooking } = require('../../Pageobjects/POM3_EventBooking.js')
const { POM4_EventDetails } = require('../../Pageobjects/POM4_EventDetails.js')
const { POM5_EventDeletion } = require('../../Pageobjects/POM5_EventDeletion.js')
const TestData = require('../../Utils/Test10_TestData');

setDefaultTimeout(60000);

Given('login to EventHub Application with valid credentials',{timeout : 100*100}, async function () {
    const { BaseURL, Email, password } = TestData
    const loginpage = new POM1_LoginPage(this.page)
    await loginpage.VisitURL(BaseURL)
    await loginpage.LoginCredential(Email, password)
    await loginpage.LoginScreenshot()
});

When('user navigates to EventHub Dashboard and creat an Event', async function () {
    const { Category, City, Address, EventDate, cost, TotalSeats, InsertImage } = TestData
    await this.EventCreationpage.CreateEvent(this.EventName, Category, City, Address, EventDate, cost, TotalSeats, InsertImage)
});

When('user view the details of created Event', async function () {
    await this.EventBookingpage.EventAssertion(this.EventName)
    await this.EventBookingpage.SeatVacancy(this.EventName)
    await this.EventBookingpage.BookingConfirm(this.customerName, this.customerEmail, this.customerNumber)
});


When('user verify the availability of slot and book the slot', async function () {
    await this.EventDetails.BookingEvent(this.EventName)
    await this.EventDetails.VerifyBookingView(this.EventName)
    await this.EventDetails.VerifyBookingDetails(this.EventName)
});

Then('user delete the event successfully', async function () {
    await this.EventDeletion.VerifyCancelBooking()
    await this.EventDeletion.DeletionOfEvent(this.EventName)
    await this.browser.close()
});


