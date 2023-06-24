import pb from '$lib/db.js';


/** @type {import('./$types').PageLoad} */
export const load=async()=>{
    try{        
        const ayearList = await pb.collection('academic_year').getFullList({sort: '-created',})        
        const cityList = await pb.collection('city').getFullList({sort: 'name',})
        const courseList = await pb.collection('course').getFullList({sort: 'name',})           
        const buspointList= await pb.collection('bus_point').getFullList({sort:'name'})
        const routePaymentList= await pb.collection('route_total_payment').getFullList({sort:'course'})


        return{
            status:'success',
            ayearList,
            cityList,
            routePaymentList,
            courseList,
            buspointList,
        }
    }catch(error){
        console.log('****',error)
        return {status:'error',error}

    }
}
