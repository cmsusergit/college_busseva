import Razorpay from "razorpay"
const rzp = new Razorpay({

    key_id: "rzp_test_4hdaHiE3PG2H8l",    key_secret: "wqPDs9hsScn4pmu4vpIrARSX",
})
let amount=1
const rzpOrder = await rzp.orders.create({
    amount: amount * 100, // rzp format with paise
    currency: 'INR',
    receipt: "receipt#1", //Receipt no that corresponds to this Order,
    payment_capture: true,

    notes: {
        orderType: "Pre"
    } //Key-value pair used to store additional information
})
console.log('****',rzpOrder)
// const subscriptionObject = {
//     plan_id: 'plan_00000000000001',
//     total_count: 60,
//     quantity: 1,
//     customer_notify: 1,
// }
// rzp.subscriptions.create(subscriptionObject)
// .then(ob=>{
//     console.log(ob)
// })