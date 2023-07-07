import { json } from '@sveltejs/kit'
import Razorpay from 'razorpay'

export const GET=async(event)=>{
    const orderid=event.url.searchParams.get('orderid')

    const rzrpay1= new Razorpay({ key_id: 'rzp_test_JYdzDk5tUT2JJR', key_secret: 'xa9HFuV4XeapBYVqNE9AX3AL' })    
    try{
        const order1=await rzrpay1.orders.fetch(orderid)
        console.log(order1)
        return json(order1)
    }catch(error1){

        console.log(error1)        
        return json(error1)
    }
}
export const POST=async(event) =>{
    const dt=await event.request.json()
    const rzrpay1= new Razorpay({ key_id: 'rzp_test_JYdzDk5tUT2JJR', key_secret: 'xa9HFuV4XeapBYVqNE9AX3AL' })    
    try{
        const order1=await rzrpay1.orders.create(dt)
        console.log(order1)
        return json(order1)
    }catch(error1){

        console.log(error1)        
        return json(error1)

    }
}






