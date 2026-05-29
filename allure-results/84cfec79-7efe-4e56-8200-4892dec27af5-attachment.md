# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Test08_LoginBypass.spec.js >> Order id verification >> Order creation
- Location: tests\Test08_LoginBypass.spec.js:41:5

# Error details

```
Test timeout of 10000ms exceeded.
```

```
Error: locator.textContent: Test timeout of 10000ms exceeded.
Call log:
  - waiting for locator('div.prodTotal')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire" [ref=e11] [cursor=pointer]:
      - /url: https://techsmarthire.com/
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [ref=e24]: 
          - text: Sign Out
  - generic [ref=e25]:
    - generic [ref=e26]:
      - heading "My Cart" [level=1] [ref=e27]
      - button "Continue Shopping❯" [ref=e28] [cursor=pointer]
    - heading "No Products in Your Cart !" [level=1] [ref=e30]
```

# Test source

```ts
  1   | /* Verification of order creation is displaying in history page */
  2   | 
  3   | const { test, expect, request } = require('@playwright/test')
  4   | const { LOADIPHLPAPI } = require('node:dns')
  5   | const loginpayload = { userEmail: "6orwy@gmail.com", userPassword: "Test@12pass" }
  6   | const {APIUtils} = require('../Utils/APIutils')
  7   | 
  8   | test.describe('Order id verification', () => {
  9   | 
  10  | 
  11  |     let token;
  12  |     //Bypassing the login through API
  13  |     test.beforeAll('Login through API', async ({ browser }) => {
  14  | 
  15  |         const context = await browser.newContext()
  16  |         const page = await context.newPage()
  17  |         const API = await request.newContext()
  18  | 
  19  |         const LoginByPass = await API.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
  20  |             data: loginpayload
  21  |         })
  22  |         const loginresponse = await LoginByPass.json()
  23  |         token = loginresponse.token
  24  |         expect(LoginByPass.ok()).toBeTruthy()
  25  |     })
  26  | 
  27  |     //Store the token and use it for login directly
  28  |     test('Title verification', async ({ page }) => {
  29  | 
  30  |         console.log('The Login Token is : ', token)
  31  | 
  32  |         await page.addInitScript(value => {
  33  |             window.localStorage.setItem('token', value)
  34  |         }, token);
  35  | 
  36  |         await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
  37  |         expect(page).toHaveTitle("Let's Shop")
  38  | 
  39  |     })
  40  | 
  41  |     test('Order creation', async ({ page }) => {
  42  | 
  43  |         const API = await request.newContext()
  44  |         const apiutils = new APIUtils(API)
  45  | 
  46  |         await page.addInitScript(value => {
  47  |             window.localStorage.setItem('token', value)
  48  |         }, token)
  49  | 
  50  |         await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
  51  |         console.log(await page.title())
  52  |         await page.reload()
  53  |         const productCard = page.locator('div.card').filter({ hasText: 'ZARA COAT 3' })
  54  |         await productCard.locator('i.fa-shopping-cart').click()
  55  |         const ITEM = await page.getByText("ZARA COAT 3").innerText()
  56  |         expect(ITEM).toContain('ZARA COAT 3')
  57  | 
  58  |         await page.getByRole('button', { name: "cart" }).first().click()
> 59  |         const CartValue = await page.locator('div.prodTotal ').textContent()
      |                                                                ^ Error: locator.textContent: Test timeout of 10000ms exceeded.
  60  |         await expect(CartValue).toEqual('$ 11500')
  61  | 
  62  |         await page.getByRole('button', { name: 'Checkout' }).click()
  63  | 
  64  |         await page.getByPlaceholder('Select Country').pressSequentially('India')
  65  |         await page.getByText('India', { exact: true }).click()
  66  |         await page.getByText('Place Order ').click()
  67  |         await page.locator('tr.line-item').textContent()
  68  | 
  69  |         const RawOrderText = await page.locator('label.ng-star-inserted').textContent()
  70  |         const splitText = RawOrderText.split(' | ')
  71  |         const OrderID = splitText[1].trim()
  72  |         console.log('The OrderID is : ', OrderID)
  73  | 
  74  |         await page.getByRole('button', { name: "ORDERS" }).click()
  75  |         const Order = page.locator('tbody')
  76  | 
  77  |         const OrderHistory = Order.filter({ hasText: OrderID })
  78  |         console.log(OrderHistory)
  79  |         await OrderHistory.isVisible().then(() => {
  80  |             console.log("The OrderID : ", OrderID, "is available in  order history")
  81  |         })
  82  |         await expect(Order).toContainText(OrderID)
  83  | 
  84  |         //Deletion of created order
  85  |         await page.locator('tbody tr').filter({ hasText: OrderID }).getByRole('button', { name: "view" }).click()
  86  |         //await OrderHistory.getByRole('button', {name: "View"}).click()
  87  |         const AssertOrderID = await page.locator('.col-text').textContent()
  88  |         await expect(OrderID).toStrictEqual(AssertOrderID)
  89  |         await page.getByText(' View Orders ').click()
  90  | 
  91  |         await page.locator('tbody tr').filter({ hasText: OrderID }).getByRole('button', { name: "Delete" }).click()
  92  | 
  93  | 
  94  |         const Deletion = await API.delete('https://rahulshettyacademy.com/api/ecom/order/delete-order/' + OrderID)
  95  |         await expect(Order).not.toContainText(OrderID)
  96  | 
  97  |     })
  98  | 
  99  |     test('Create order with API', async () => {
  100 | 
  101 |         let ordernumber;
  102 |         const API = await request.newContext()
  103 |         const orderPayload = {
  104 |             orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }]
  105 |         }
  106 | 
  107 |         const CreateOrder = await API.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
  108 |             data: orderPayload,
  109 |             headers: {
  110 |                 'Authorization': token,
  111 |                 'content-type': 'application/json'
  112 |             }
  113 |         })
  114 |         const orderResponsejson = await CreateOrder.json()
  115 |         console.log("The Created order details : ", orderResponsejson)
  116 |         ordernumber = orderResponsejson.orders[0]
  117 |         console.log(ordernumber)
  118 | 
  119 |         const orderlist = await API.get('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/69d98eedf86ba51a655a4a2e', {
  120 |             data: loginpayload,
  121 |             headers: {
  122 |                 'Authorization': token,
  123 |                 'content-type': 'application/json'
  124 |             }
  125 |         })
  126 |         expect(orderlist.ok()).toBeTruthy()
  127 |         const orderlistjson = await orderlist.json()
  128 |         console.log("The available order details are: ", orderlistjson)
  129 |         //expect(JSON.stringify(orderlistjson)).toContainText(orderResponsejson)
  130 |         const AllOrders = orderlistjson.data.map(order => order._id)
  131 |         expect(AllOrders).toContain(ordernumber)
  132 |     })
  133 | })
```