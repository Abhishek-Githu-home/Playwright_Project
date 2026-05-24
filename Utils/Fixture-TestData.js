const base = require('@playwright/test')
const TestData = require('./Test10_TestData')

const customtest = base.test.extend({
    testdataforLogin : {
    BaseURL : 'https://eventhub.rahulshettyacademy.com/login',
    Email: 'anshika@gmail.com',
    password: 'Iamking@000'
    }
})

module.exports = {customtest}