import pb from '$lib/db.js'


/** @type {import('./$types').PageLoad} */
export const load=async()=>{
    try{        
        const routeList = await pb.collection('route').getFullList({sort: 'name',expand:'traveller'})
        const buspointList= await pb.collection('bus_point').getFullList({sort:'name'})
        return{
            status:'success',
            routeList,
            buspointList,

        }
    }catch(error){
        console.log('****',error)
        return {status:'error',error}

    }
}

