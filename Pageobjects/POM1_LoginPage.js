const { BaseURL } = require("../Utils/Test10_TestData");

class POM1_LoginPage {

    constructor(page) {
        this.page = page
        this.SignInButton = page.locator('#login-btn');
        this.UserName = page.getByPlaceholder('you@email.com')
        this.Password = page.getByLabel('Password')
    }

    async VisitURL() {
        await this.page.goto(BaseURL)
    }

    async LoginCredential(Email, password) {
        await this.UserName.fill(Email)
        await this.Password.fill(password)
        await this.SignInButton.click()
        await this.page.waitForLoadState('domcontentloaded')
        console.log('The page URL is : ', this.page.url())
        //await this.page.waitForLoadState('networkidle')
    }

    async LoginScreenshot() {
        
        await this.page.waitForLoadState('domcontentloaded')
        await this.page.screenshot({path : "loginscreen.png"})
    }
}
module.exports = { POM1_LoginPage }