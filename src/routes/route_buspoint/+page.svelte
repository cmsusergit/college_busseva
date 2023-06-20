<script>
import pb from '$lib/db.js'

import _ from 'lodash'
export let data

let selectedRoute
let bus_pp_list=[],selectedBusPP
$:onRouteSelected(selectedRoute)
const onRouteSelected=async(value)=>{
    const id=value?.id
    const dt = await pb.collection('route_bus_point').getFullList({sort:'sequence',filter:`route="${id}"`, expand: 'bus_point',})

    bus_pp_list=[] 
    for (let indx = 0; indx < dt.length; indx++) {
        const record = dt[indx].expand.bus_point
        bus_pp_list.push(record)        
    }
}

const removeRecord=(record)=>{
    let temp1=[...bus_pp_list]//....
    //....
    _.remove(temp1,ob=>ob.id==record.id)
    bus_pp_list=[...temp1]//....
    //....
}
const addtoRouteList=()=>{    
    if(bus_pp_list.find(ob=>ob.id==selectedBusPP.id))return
    if(selectedBusPP){
        bus_pp_list=[...bus_pp_list,selectedBusPP]//....
        //....
    }
}
</script>
<div>
    {#if data?.status=='error'}
        <p>{JSON.stringify(data?.error)}</p>
    {:else}
        <h2 style="margin-top: .1em;border-bottom:1px groove gray;">Route Management</h2>    
        <div>        
            <label for="route">Route<span style="margin-left:.2em;color:brown;">*</span>
                <select bind:value={selectedRoute} id="route" required>
                    {#each data?.routeList as route}      
                        <option value={route}>{route.name} ({route.code})</option>
                    {/each}
                </select>  
            </label>
        </div>
        {#if selectedRoute}
            <div style="margin-bottom:1em;background: teal;color:white;padding:.5em;border-radius:.5em;">
                <b>Traveller Name:</b> {selectedRoute?.expand?.traveller?.name}<br/>
                <b>Traveller Contact:</b> { selectedRoute?.expand?.traveller?.contact_person} ({selectedRoute?.expand?.traveller?.contact_number})<br/>
                <b>Route:</b> {selectedRoute?.name} ({selectedRoute?.code})              
            </div>
        {/if}
        <div>
            <label for="buspoint">Bus Pickup Point<span style="margin-left:.2em;color:brown;">*</span>
                <select bind:value={selectedBusPP} id="bus_point" required>
                    <option value="" selected>Select a Bus Point</option>              
                    {#each data?.buspointList as bus_point}          
                        <option value={bus_point}>{bus_point.name}</option>
                    {/each}
                </select>  
            </label>    
            <button on:click={addtoRouteList}>+Add To Route List</button>
        </div>
        <div>       
            <table role="grid">
                <thead>
                    <tr>
                        <th>Sr.</th>
                        <th>Bus PPoint</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {#each bus_pp_list as record,indx}
                        <tr>
                            <td>{indx+1}</td>
                            <td>{record.name}</td>
                            <td width="10">
                                <button on:click={()=>removeRecord(record)} class="contrast" style="width:10px,height:10px;">
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