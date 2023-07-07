// @ts-nocheck
import pb from '$lib/db.js'


/** @param {Parameters<import('./$types').PageLoad>[0]} event */
export const load=async({url})=>{
    const route_id = url.searchParams.get('route_id')
    try{        
        const routeList = await pb.collection('route').getFullList({sort: 'name',expand:'traveller',filter:'is_active=True'})
        const buspointList= await pb.collection('bus_point').getFullList({sort:'name'})
        return{
            status:'success',
            routeList,

            buspointList,
            route_id,
        }
    }catch(error){
        console.log('****',error)
        return {status:'error',error}

    }
}





