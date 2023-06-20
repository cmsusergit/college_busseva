<script>
    import { invalidateAll } from '$app/navigation';

    import pb from '$lib/db.js'
    export let data
    let routeRecord={ 
        "code": '',
        "name": '',
        "traveller":'',    
        "is_active": true,
        "city": '',
        "slot": ''}

let mesg,error_mesg
let loading=false,recordToRemove
$:if(routeRecord.traveller)
    generateRouteName()
const generateRouteName=()=>{
    console.log(routeRecord)
    routeRecord.code=''
    routeRecord.code+=data?.travellerList?.find(ob=>ob.id==routeRecord?.traveller)?.name.toUpperCase().substr(0,2)??''
    routeRecord.code+=data?.slotList?.find(ob=>ob.id==routeRecord?.slot)?.name.toUpperCase().substr(0,2)??''
    const temp1=data?.slotList?.length+1
    routeRecord.code+=temp1?(temp1+'').padStart(5,'0'):''
    console.log(data?.routeList.length)
}
const onsubmit=async()=>{
    try{
        loading=true
        await pb.collection('route').create(routeRecord)
        mesg='Successfully Inserted'
        error_mesg=''
    }catch(error1){
        mesg=''
        error_mesg=error1.message
        console.log("****",error1)
    }
    finally{
        loading=false
        invalidateAll()
    }
}

const removeRecord=async(record)=>{
    try{
        loading=true
        record.is_active=false        
        await pb.collection('route').update(record.id, record)
        mesg='Successfully Removed'
        error_mesg=''
        recordToRemove=''
    }catch(error1){
        mesg=''
        error_mesg=error1.message
        console.log("****",error1)
    }
    finally{
        invalidateAll()
        loading=false
    }
}
</script>








<div>
    {#if mesg}    
        <p style="background: green;color:white;text-align: center;padding: .5em;">{mesg}</p>
    {/if}
    {#if error_mesg}
        <p style="background: orange;color:white;text-align: center;padding: 0.5em;">{error_mesg}</p>
    {/if}
    {#if data?.status=='error'}
        <p style="background: orange;color:white;text-align: center;padding: 0.5em;">{data?.error}</p>
    {:else}
        <h2 style="margin-top: .1em;border-bottom:1px groove gray;">Route Management</h2>    
        <form on:submit|preventDefault={onsubmit}>
            <div class="grid">          
                <label for="code">Route Code<span style="margin-left:.2em;color:brown;">*</span>            
                    <input bind:value={routeRecord.code} id="code" type="text" disabled>
                </label>
                <label for="name">Route Name<span style="margin-left:.2em;color:brown;">*</span>            
                    <input bind:value={routeRecord.name} id="name" type="text">
                </label>
            </div>
            <div class="grid">        
                <label for="city">City<span style="margin-left:.2em;color:brown;">*</span>
                    <select bind:value={routeRecord.city} id="city" required>
                        {#each data?.cityList as city}          
                            <option value={city.id}>{city.name}</option>
                        {/each}
                    </select>  
                </label>
                <label for="traveller">Traveller<span style="margin-left:.2em;color:brown;">*</span>
                    <select bind:value={routeRecord.traveller} id="traveller" required>
                        <option value="" selected>Select Traveller</option>              
                        {#each data?.travellerList as traveller}          
                            <option value={traveller.id}>{traveller.name}</option>
                        {/each}
                    </select>  
                </label>                
            </div>
            <div>                
                <label for="slot1">Slot<span style="margin-left:.2em;color:brown;">*</span>
                    <select bind:value={routeRecord.slot} id="slot1" required>
                        <option value="" selected>Select Slot</option>              
                        {#each data?.slotList as slot}          
                            <option value={slot.id}>{slot.name}</option>
                        {/each}
                    </select>  
                </label>                
            </div>
            <div>
                <button aria-busy={loading}>SUBMIT</button>
            </div>
        </form>
        <div aria-busy={loading}>       
            <table role="grid">
                <thead>
                    <tr>
                        <th>Sr.</th>
                        <th>Route Code</th>
                        <th>Route Name</th>
                        <th>Traveller Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {#each data?.routeList as record,indx}
                        <tr>
                            <td>{indx+1}</td>
                            <td>{record.code}</td>
                            <td>{record.name}</td>
                            <td>{record?.expand?.traveller.name}</td>
                            <td width="10">
                                <button on:click={()=>recordToRemove=record} class="contrast" style="width:10px,height:10px;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M17 22H7C5.89543 22 5 21.1046 5 20V7H3V5H7V4C7 2.89543 7.89543 2 9 2H15C16.1046 2 17 2.89543 17 4V5H21V7H19V20C19 21.1046 18.1046 22 17 22ZM7 7V20H17V7H7ZM9 4V5H15V4H9ZM15 18H13V9H15V18ZM11 18H9V9H11V18Z" fill="currentColor"/> </svg>
                                </button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
</div>
{#if recordToRemove}
    <dialog open>
        <article>
            <h4>Confirm Remove?</h4>
            <p>Do you Really Want to Remove?</p>
            <footer>                
                <button on:click={()=>recordToRemove=''} class="secondary">Cancel</button>
                <button on:click={removeRecord(recordToRemove)}>Confirm</button>
            </footer>
        </article>
    </dialog>
{/if}
<style>
    th{
        text-align: center;
        font-weight:bold;
    }
    td{
        color:slategray;
        text-align: center;
    }
</style>