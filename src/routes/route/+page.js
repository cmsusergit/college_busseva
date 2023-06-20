import pb from '$lib/db.js'


/** @type {import('./$types').PageLoad} */
export const load=async()=>{
    try{        
        const routeList = await pb.collection('route').getFullList({sort: 'name',filter:'is_active=True',expand:'traveller'})        
        const slotList = await pb.collection('slot').getFullList({sort: 'name'})
        const cityList = await pb.collection('city').getFullList({sort: 'name'})
        const travellerList= await pb.collection('travellers').getFullList({sort:'name'})
        return{
            status:'success',

            cityList,
            slotList,
            routeList,
            travellerList,
        }
    }catch(error1){
        console.log('****',error1)
        return {status:'error',error:error1.message}

    }
}

