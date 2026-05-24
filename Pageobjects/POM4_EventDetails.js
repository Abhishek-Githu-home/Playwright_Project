const { expect } = require('@playwright/test')
const strict = require('node:assert/strict')

class POM4_EventDetails {

    constructor(page) {
        this.page = page
        this.EventCard = page.getByTestId('event-card')
        this.LatestseatCounter = page.locator('.text-emerald-600').last()
        //this.EventDetails = page.locator('.space-y-4').first().innerText()
        //this.BookingEvent = page.getByText(EventName, { exact: true }).textContent()

    }

    async BookingEvent(EventName) {
        return await this.page.locator('h1.text-2xl').filter({hasText : EventName}).textContent();
    }

    async EventDetails(EventName) {
        return await this.page.locator('div.space-y-4:visible').locator('#booking-card').filter({hasText : EventName}).innerText()
    }

    async VerifyBookingView(EventName) {
        await this.page.getByRole('button', { name: 'View My Bookings' }).click()
        await this.page.waitForLoadState('networkidle')
        const actualTitle = await this.page.locator('h3.font-semibold').filter({hasText : EventName}).textContent()
        console.log("The currently showing the event of : ", EventName)
        expect(actualTitle).toStrictEqual(EventName)
    }

    async VerifyBookingDetails(EventName) {
        await this.page.getByRole('button', { name: 'View Details' }).first().click()
        await this.page.waitForLoadState("networkidle")
        await this.page.reload({ timeout: 10000 })

        await this.page.getByTestId('nav-events').click()
        const UpdateEvent = this.EventCard.filter({ hasText: EventName }).last()
        await UpdateEvent.locator('#book-now-btn').click()

        await expect(this.LatestseatCounter).toHaveText('49 / 50 seats')
    }
}
module.exports = { POM4_EventDetails }