const { test, expect } = require('@playwright/test')
const { TIMEOUT } = require('node:dns')
const { customtest } = require('../Utils/Fixture-TestData.js')


const { POM1_LoginPage } = require('../Pageobjects/POM1_LoginPage.js')
const { POM2_EventCreation } = require('../Pageobjects/POM2_EventCreation.js')
const { POM3_EventBooking } = require('../Pageobjects/POM3_EventBooking.js')
const { POM4_EventDetails } = require('../Pageobjects/POM4_EventDetails.js')
const { POM5_EventDeletion } = require('../Pageobjects/POM5_EventDeletion.js')
const TestData = require('../Utils/Test10_TestData');

// This is for TestDataParamisation > Test10_TestData.js
test('@E2E Login to Event register application - TestData', async ({ browser }) => {

    const Context = await browser.newContext()
    const page = await Context.newPage()
    const loginpage = new POM1_LoginPage(page)
    const EventCreationpage = new POM2_EventCreation(page)
    const EventBookingpage = new POM3_EventBooking(page)
    const EventDetails = new POM4_EventDetails(page)
    const EventDeletion = new POM5_EventDeletion(page)

    const { BaseURL, Email, password, Category, City, EventName, EventDate, Address, cost, TotalSeats, InsertImage, customerName, customerEmail, customerNumber } = TestData

    //PageObjectModel 
    await loginpage.VisitURL(BaseURL)
    await loginpage.LoginCredential(Email, password)
    await loginpage.LoginScreenshot()


    await EventCreationpage.CreateEvent(EventName, Category, City, Address, EventDate, cost, TotalSeats, InsertImage)
    await EventBookingpage.EventAssertion(EventName)
    await EventBookingpage.SeatVacancy(EventName)
    await EventBookingpage.BookingConfirm(customerName, customerEmail, customerNumber)

    await EventDetails.BookingEvent(EventName)
    await EventDetails.VerifyBookingView(EventName)
    await EventDetails.VerifyBookingDetails(EventName)

    await EventDeletion.VerifyCancelBooking()
    await EventDeletion.DeletionOfEvent(EventName)

})


//This is for the use of fixture > Fixture-TestData.js
customtest('Login to Event register application - DataFixture', async ({browser, testdataforLogin }) => {

    const Context = await browser.newContext()
    const page = await Context.newPage()
    const data = testdataforLogin
    const loginpage = new POM1_LoginPage(page)

    //const { BaseURL, Email, password, Category, City, EventName, EventDate, Address, cost, TotalSeats, InsertImage, customerName, customerEmail, customerNumber } = TestData

    //PageObjectModel 
    await loginpage.VisitURL(testdataforLogin.BaseURL)
    await loginpage.LoginCredential(testdataforLogin.Email, testdataforLogin.password)
    await loginpage.LoginScreenshot()
})
