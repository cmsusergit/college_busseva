import pb from '$lib/db.js'


/** @type {import('./$types').PageLoad} */
export const load=async()=>{
    try{        
        const deptList = await pb.collection('department').getFullList({sort: 'name',expand:'course'})        
        const courseList = await pb.collection('course').getFullList({sort: 'name'})
        return{
            status:'success',
            deptList,
            courseList

        }
    }catch(error1){
        console.log('****',error1)
        return {status:'error',error:error1.message}

    }
}

