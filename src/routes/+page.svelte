<script>
    import { onMount } from 'svelte';
    
    import pb from '$lib/db.js'
    let ayearList=''
    onMount(async()=>{
        try{
            ayearList = await pb.collection('academic_year').getFullList({sort: '-created',})
        }
        catch(error){
            console.log(error)

        
        }
    })
</script>
<div>
    <h1>Hello There</h1>

    <p>{JSON.stringify(ayearList)}</p>
</div>