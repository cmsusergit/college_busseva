// @ts-nocheck
import pb from '$lib/db.js'


/** */
export const load=async()=>{
    try{        
        const slotList = await pb.collection('slot').getFullList({sort: 'name'})
        const courseList= await pb.collection('course').getFullList({sort:'name',expand:'slot'})
        return{
            status:'success',
            courseList,
            slotList,

        }
    }catch(error1){
        console.log('****',error1)
        return {status:'error',error:error1.message}

    }
}

