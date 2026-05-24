class APIUtils {

    constructor(API,loginpayload) {
        this.API = API
        this.loginpayload = loginpayload
        //this.orderPayload = orderPayload
    }

    async getToken() {
        const APIContext = await request.newContext()
        const PositiveLogin = await APIContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
            data: this.validpayload
        })
        expect(PositiveLogin.ok()).toBeTruthy(); // valid credentials - 200 status code
        const positiveValidloginJSON = await PositiveLogin.json();
        token = positiveValidloginJSON.token;

    }

    async createorder() {
        let ordernumber;
        const API = await request.newContext()
        const orderPayload = {
            orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }]
        }

        const CreateOrder = await API.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
            data: this.orderPayload,
            headers: {
                'Authorization': token,
                'content-type': 'application/json'
            }
        })
        const orderResponsejson = await CreateOrder.json()
        console.log("The Created order details : ", orderResponsejson)
        ordernumber = orderResponsejson.orders[0]
        console.log(ordernumber)
    }
}
module.exports = {APIUtils}