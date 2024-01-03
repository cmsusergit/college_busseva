import { json, text } from '@sveltejs/kit'
import { env } from '$env/dynamic/public'

import {encrypt} from '$lib/util/ccavutil'   
export const POST=async(event) =>{
    const dt=await event.request.json()
    try{
        const cred=env.PUBLIC_PAYMENT_CRED
        const accessCode=env.PUBLIC_ACCESSCODE
        let encRequest=''
        let requestDt=''
        for (const ob in dt) {

            requestDt+=`${ob}=${dt[ob]}&`
        }        
        const sub_account_id='NESTFEE2023'
        requestDt+=`sub_account_id=${sub_account_id}`
        console.log('****',requestDt);
        encRequest=encrypt(requestDt,cred) 
        let ccAvenueUrl=`https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=${dt.merchant_id}&encRequest=${encRequest}&access_code=${accessCode}&sub_account_id=${sub_account_id}`
        console.log('----',ccAvenueUrl)
        try {
            return text(ccAvenueUrl)
        } catch (error) {
            console.error("Error:", error);
            return text(error)
        }
    }catch(error1){

        console.log(error1)        
        return json(error1)
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
}


