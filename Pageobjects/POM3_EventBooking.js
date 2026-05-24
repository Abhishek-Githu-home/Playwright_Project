const {expect} = require('@playwright/test')

class POM3_EventBooking {
    constructor(page) {
        this.page = page
        this.EventCard = page.getByTestId('event-card')
        this.Events = page.getByTestId('nav-events')
        this.seatCounter = page.locator('.text-emerald-600').last()
    }

    async EventAssertion(EventName) {
        await this.Events.click()
        await this.page.locator("//h3[normalize-space()='Dilli Diwali Mela']").textContent()
        //await this.page.pause()

        await expect(this.EventCard.filter({ hasText: EventName })).toBeVisible();
        console.log("The created Event is : ", EventName)
        await expect(this.EventCard).toHaveCount(4)
    }

    async SeatVacancy(EventName) {
        await this.EventCard.filter({hasText: EventName}).locator('#book-now-btn').click()
        console.log("The initial seat count is : ", this.initialCount, "And ", this.seatCounter)
        await expect(this.seatCounter).toHaveText('50 / 50 seats')
    }

    async BookingConfirm(customerName,customerEmail,customerNumber) {
        await this.page.locator('#customerName').fill(customerName)
        await this.page.getByTestId('customer-email').fill(customerEmail)
        await this.page.getByRole('textbox', { name: 'phone' }).fill(customerNumber)
        await this.page.getByRole('button', { name: 'Confirm Booking' }).click()

        await expect(this.page.locator('h3.text-xl').filter({ hasText: "Booking Confirmed! 🎉" })).toBeVisible()
    }
}
module.exports = {POM3_EventBooking}