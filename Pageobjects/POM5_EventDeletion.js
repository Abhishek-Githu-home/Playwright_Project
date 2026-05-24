const { expect } = require("@playwright/test")

class POM5_EventDeletion {
    constructor(page) {
        this.page = page
    }

    async VerifyCancelBooking() {
        await this.page.locator('#nav-bookings').click()
        await this.page.locator('button').filter({ hasText: 'Cancel Booking' }).first().click()
        await this.page.getByTestId('confirm-dialog-yes').click()
        await expect(this.page.getByText('Booking Cancelled Successfully')).toBeVisible()
    }

    async DeletionOfEvent(EventName) {

        await this.page.getByTestId('nav-events').click()
        await this.page.getByRole('button', { name: 'Add New Event' }).click()
        const DeleteEvent = this.page.getByTestId('event-table-row').filter({ hasText: EventName })
        await DeleteEvent.getByRole('button', { name: 'Delete' }).click()
        await this.page.getByTestId('confirm-dialog-yes', { TIMEOUT: 10000 }).click()
        await this.page.getByText('Event deleted').isVisible()
        await expect(DeleteEvent).toBeHidden()

    }
}
module.exports = {POM5_EventDeletion}