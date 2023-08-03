import pb from '$lib/db.js'
import { env } from '$env/dynamic/public'

import {redirect } from '@sveltejs/kit'
import {decrypt} from '$lib/util/ccavutil'
import qs from 'querystring'

export const POST=async(event) =>{
    const dt=await event.request.text()
    const temp1=qs.parse(dt)
    var encryption = temp1.encResp
    const cred=env.PUBLIC_PAYMENT_CRED

    const response=decrypt(encryption,cred)
    const ccavResponse = qs.parse(response)
    if(ccavResponse.order_status?.includes('Success')){
        await pb.collection('bus_fees').update(ccavResponse.order_id,{'order_id':ccavResponse.tracking_id,payment_status:true})                                            
        console.log('----',ccavResponse.order_id)
    }
    console.log(response)
    throw redirect(302,`/response?response=${JSON.stringify(ccavResponse)}`)       
}     








    // const rzrpay1= new Razorpay({ key_id: 'rzp_test_JYdzDk5tUT2JJR', key_secret: 'xa9HFuV4XeapBYVqNE9AX3AL' })    
    // try{
    //     const order1=await rzrpay1.orders.create(dt)
    //     console.log(order1)
    //     return json(order1)
    // }catch(error1){

    //     console.log(error1)        
    //     return json(error1)
    // }