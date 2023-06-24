import Razorpay from 'razorpay'
export const POST=async(event) =>{

    const dt=await event.request.json()
    console.log('****',dt)
    const rzrpay1= new Razorpay({ key_id: 'rzp_test_JYdzDk5tUT2JJR', key_secret: 'xa9HFuV4XeapBYVqNE9AX3AL' })    
    try{
        const order1=await rzrpay1.orders.create(dt)
        console.log(order1)
        return new Response(order1)
    }catch(error1){


        console.log(error1)        
        return new Response(error1)

    }
}






