Feature: Verification of Ecommerce Validation

    Scenario: Create an Event and Book the slot in EventHub Application
        Given  login to EventHub Application with valid credentials
        When  user navigates to EventHub Dashboard and creat an Event
        When  user view the details of created Event
        When  user verify the availability of slot and book the slot
        Then  user delete the event successfully