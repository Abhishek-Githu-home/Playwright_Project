const { test, expect } = require('@playwright/test')
const { TIMEOUT } = require('node:dns')

test('Login to Event register application', async ({ browser }) => {

    const Context = await browser.newContext()
    const page = await Context.newPage()

    const BaseURL = 'https://eventhub.rahulshettyacademy.com/login'
    const Email = 'testingAbhi@gmail.com'
    const Password = 'Testing@12'
    const Category = 'Workshop'
    const City = 'Bengaluru'
    const EventName = `Event - ${Date.now()}`
    const EventDate = '2026-09-12T08:30'
    const Address = 'No-5th richmond street, MG Road, Bengaluru'
    const cost = '100'
    const TotalSeats = '50'
    const InsertImage = "https://t3.ftcdn.net/jpg/07/33/50/26/360_F_733502690_GYuQrHyM4W7xxhRW0UPGrySJxJoRnNz4.jpg"
    const customerName = 'Virat Kohli'
    const customerEmail = 'Virat2027@gmail.com'
    const customerNumber = '+91 9383103103'

    await page.goto(BaseURL);
    await page.waitForLoadState('networkidle')
    const PageTitle = await page.title()
    console.log('The title is : ', PageTitle)

    await page.getByPlaceholder('you@email.com').fill(Email)
    await page.getByLabel('Password').fill(Password)
    await page.locator('#login-btn').click()

    console.log(await page.getByRole('heading', { name: 'EventHub' }).textContent())
    await page.getByTestId('nav-events').click()

    const EventCart = await page.getByTestId('event-card').count({ TIMEOUT: 10000 })
    console.log('The total available events are : ', EventCart)
    await expect(page.getByTestId('event-card')).toHaveCount(3)


    await page.getByRole('button', { name: 'Add New Event' }).click()
    console.log(page.url());


    await page.locator('#event-title-input').fill(EventName);
    await page.getByPlaceholder('Describe the event…').fill('This is Event being hosted by richerstrom organisation on ' + EventName);
    await page.getByLabel('Category').selectOption(Category)
    await page.getByLabel('City').fill(City)
    await page.getByLabel('Venue').fill(Address)
    await page.getByLabel('Event Date & Time').fill(EventDate)
    await page.getByLabel('Price ($)').fill(cost);
    await page.getByLabel('Total Seats').fill(TotalSeats);
    await page.getByLabel('Image URL (optional)').fill(InsertImage);
    await page.locator('#add-event-btn').click()

    await page.getByText('Event Created !').isVisible()
    await page.waitForLoadState('networkidle')
    await page.getByTestId('nav-events').click()
    //await page.locator('h3').filter({ hasText: 'Dilli Diwali Mela' }).textContent()
    await page.locator("//h3[normalize-space()='Dilli Diwali Mela']").textContent()
    const EventCard = page.getByTestId('event-card')

    await expect(EventCard.filter({ hasText: EventName })).toBeVisible();
    await expect(EventCard).toHaveCount(4)
    await EventCard.last().locator('#book-now-btn').click()
    const seatCounter = page.locator('.text-emerald-600').last()
    const seatnumber = seatCounter.innerText()
    const initialCount = parseInt(seatnumber, 10)
    console.log(initialCount)
    await expect(seatCounter).toHaveText('50 / 50 seats')


    await page.locator('#customerName').fill(customerName)
    await page.getByTestId('customer-email').fill(customerEmail)
    await page.getByRole('textbox', { name: 'phone' }).fill(customerNumber)
    await page.getByRole('button', { name: 'Confirm Booking' }).click()

    await expect(page.locator('h3.text-xl').filter({ hasText: "Booking Confirmed! 🎉" })).toBeVisible()
    await page.getByRole('button', { name: 'View My Bookings' }).click()
    const BookingEvent = await page.getByText(EventName, { exact: true }).textContent()
    console.log(BookingEvent)
    expect(BookingEvent).toStrictEqual(EventName)


    await page.getByRole('button', { name: 'View Details' }).first().click()
    /*const EventDetails = await page.locator('div.space-y-4:visible').textContent()
    console.log(EventDetails)*/
    const EventDetails_02 = await page.locator('.space-y-4').first().innerText() //Prints inner text of elements
    console.log(EventDetails_02)

    await page.waitForLoadState("networkidle")
    await page.reload({timeout : 10000})

    await page.getByTestId('nav-events').click()
    await EventCard.last().locator('#book-now-btn').click()
    const ExpectedSeats = Number(initialCount - 1)
    const ExpectedText = `${ExpectedSeats} / 50 seats`
    console.log(ExpectedText)
    //await expect(seatCounter).toHaveText(ExpectedText)

    await page.locator('#nav-bookings').click()
    await page.locator('button').filter({ hasText: 'Cancel Booking' }).first().click()
    await page.getByTestId('confirm-dialog-yes').click()
    await expect(page.getByText('Booking Cancelled Successfully')).toBeVisible()

// Delete the event
    await page.getByTestId('nav-events').click()
    await page.getByRole('button', { name: 'Add New Event' }).click()
    const DeleteEvent = page.getByTestId('event-table-row').filter({ hasText: EventName })
    await DeleteEvent.getByRole('button', { name: 'Delete' }).click()
    await page.getByTestId('confirm-dialog-yes', { TIMEOUT: 10000 }).click()
    await page.getByText('Event deleted').isVisible()
    await expect(DeleteEvent).toBeHidden()



















})