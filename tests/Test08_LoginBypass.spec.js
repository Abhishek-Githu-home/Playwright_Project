/* Verification of order creation is displaying in history page */

const { test, expect, request } = require('@playwright/test')
const { LOADIPHLPAPI } = require('node:dns')
const loginpayload = { userEmail: "6orwy@gmail.com", userPassword: "Test@12pass" }
const {APIUtils} = require('./Utils/APIutils')

test.describe('Order id verification', () => {


    let token;
    //Bypassing the login through API
    test.beforeAll('Login through API', async ({ browser }) => {

        const context = await browser.newContext()
        const page = await context.newPage()
        const API = await request.newContext()

        const LoginByPass = await API.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
            data: loginpayload
        })
        const loginresponse = await LoginByPass.json()
        token = loginresponse.token
        expect(LoginByPass.ok()).toBeTruthy()
    })

    //Store the token and use it for login directly
    test('Title verification', async ({ page }) => {

        console.log('The Login Token is : ', token)

        await page.addInitScript(value => {
            window.localStorage.setItem('token', value)
        }, token);

        await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
        expect(page).toHaveTitle("Let's Shop")

    })

    test('Order creation', async ({ page }) => {

        const API = await request.newContext()
        const apiutils = new APIUtils(API)

        await page.addInitScript(value => {
            window.localStorage.setItem('token', value)
        }, token)

        await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
        console.log(await page.title())
        await page.reload()
        const productCard = page.locator('div.card').filter({ hasText: 'ZARA COAT 3' })
        await productCard.locator('i.fa-shopping-cart').click()
        const ITEM = await page.getByText("ZARA COAT 3").innerText()
        expect(ITEM).toContain('ZARA COAT 3')

        await page.getByRole('button', { name: "cart" }).first().click()
        const CartValue = await page.locator('div.prodTotal ').textContent()
        await expect(CartValue).toEqual('$ 11500')

        await page.getByRole('button', { name: 'Checkout' }).click()

        await page.getByPlaceholder('Select Country').pressSequentially('India')
        await page.getByText('India', { exact: true }).click()
        await page.getByText('Place Order ').click()
        await page.locator('tr.line-item').textContent()

        const RawOrderText = await page.locator('label.ng-star-inserted').textContent()
        const splitText = RawOrderText.split(' | ')
        const OrderID = splitText[1].trim()
        console.log('The OrderID is : ', OrderID)

        await page.getByRole('button', { name: "ORDERS" }).click()
        const Order = page.locator('tbody')

        const OrderHistory = Order.filter({ hasText: OrderID })
        console.log(OrderHistory)
        await OrderHistory.isVisible().then(() => {
            console.log("The OrderID : ", OrderID, "is available in  order history")
        })
        await expect(Order).toContainText(OrderID)

        //Deletion of created order
        await page.locator('tbody tr').filter({ hasText: OrderID }).getByRole('button', { name: "view" }).click()
        //await OrderHistory.getByRole('button', {name: "View"}).click()
        const AssertOrderID = await page.locator('.col-text').textContent()
        await expect(OrderID).toStrictEqual(AssertOrderID)
        await page.getByText(' View Orders ').click()

        await page.locator('tbody tr').filter({ hasText: OrderID }).getByRole('button', { name: "Delete" }).click()


        const Deletion = await API.delete('https://rahulshettyacademy.com/api/ecom/order/delete-order/' + OrderID)
        await expect(Order).not.toContainText(OrderID)

    })

    test('Create order with API', async () => {

        let ordernumber;
        const API = await request.newContext()
        const orderPayload = {
            orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }]
        }

        const CreateOrder = await API.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
            data: orderPayload,
            headers: {
                'Authorization': token,
                'content-type': 'application/json'
            }
        })
        const orderResponsejson = await CreateOrder.json()
        console.log("The Created order details : ", orderResponsejson)
        ordernumber = orderResponsejson.orders[0]
        console.log(ordernumber)

        const orderlist = await API.get('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/69d98eedf86ba51a655a4a2e', {
            data: loginpayload,
            headers: {
                'Authorization': token,
                'content-type': 'application/json'
            }
        })
        expect(orderlist.ok()).toBeTruthy()
        const orderlistjson = await orderlist.json()
        console.log("The available order details are: ", orderlistjson)
        //expect(JSON.stringify(orderlistjson)).toContainText(orderResponsejson)
        const AllOrders = orderlistjson.data.map(order => order._id)
        expect(AllOrders).toContain(ordernumber)
    })
})