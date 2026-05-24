const { expect } = require('@playwright/test')

class POM2_EventCreation {
    constructor(page) {
        this.page = page
    }

    get EventCard() {
        return this.page.getByTestId('event-card')
    }

    get Events() {
        return this.page.locator('#nav-events')
    }

    async CreateEvent(EventName, Category, City, Address, EventDate, cost, TotalSeats, InsertImage) {
        await this.page.waitForLoadState('domcontentloaded')
        await this.page.screenshot({ path: 'POM2page.png' })

        //await expect(this.Events).toBeVisible({ timeout: 5000 })
        await this.page.locator('#nav-events').click()

        console.log('The total available events are : ', await this.EventCard.count())
        await expect(this.EventCard).toHaveCount(3)

        await this.page.getByRole('button', { name: 'Add New Event' }).click()
        console.log('The EVENT URL is : ', this.page.url())

        await this.page.locator('#event-title-input').fill(EventName)
        await this.page.getByPlaceholder('Describe the event…').fill('This is Event being hosted by richerstrom organisation on ' + EventName)
        await this.page.getByLabel('Category').selectOption(Category)
        await this.page.getByLabel('City').fill(City)
        await this.page.getByLabel('Venue').fill(Address)
        await this.page.getByLabel('Event Date & Time').fill(EventDate)
        await this.page.getByLabel('Price ($)').fill(cost)
        await this.page.getByLabel('Total Seats').fill(TotalSeats)
        await this.page.getByLabel('Image URL (optional)').fill(InsertImage)
        await this.page.getByTestId('add-event-btn').click()
        //await this.page.pause()

        await expect(this.page.getByText('Event Created!')).toBeVisible()
    }
}

module.exports = { POM2_EventCreation }