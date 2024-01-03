/** @type {import('./$types').PageLoad} */
// import { supabase } from '$lib/db'

export async function load({ params,url }) {
    const response = url.searchParams.get('response')    
    // let { data:academicYear, error:ayear_err } = await supabase
    //     .from('AcademicYear').select('*').eq('id',ayear_id).single()
    // if(ayear_err)
    //     return {error:ayear_err}
    return {
        response:JSON.parse(response)
}}





