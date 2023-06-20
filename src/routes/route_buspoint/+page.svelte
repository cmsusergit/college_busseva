<script>
import pb from '$lib/db.js'

import { Alert,Button,Radio,Heading,Spinner,Select,Label } from 'flowbite-svelte'    
import {Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell} from 'flowbite-svelte'
import _ from 'lodash'
export let data
let mesg=''
let selectedRoute,error_mesg=''
let route_bus_point=[],selectedBusPP
let bus_pp_list_changed=[],loading=false
$:onRouteSelected(selectedRoute)


const onRouteSelected=async(value)=>{
    const id=value?.id    
    route_bus_point = await pb.collection('route_bus_point').getFullList({sort:'sequence',filter:`route="${id}"`, expand: 'bus_point',})
    bus_pp_list_changed=[]
    for (let indx = 0; indx < route_bus_point.length; indx++) {
        const record = route_bus_point[indx].expand.bus_point
        bus_pp_list_changed.push(record)
    }
}
const removeRecord=(record)=>{
    let temp1=[...bus_pp_list_changed]//....
    //....
    _.remove(temp1,ob=>ob.id==record.id)
    bus_pp_list_changed=[...temp1]//....
    //....
}
const addtoRouteList=()=>{    
    if(bus_pp_list_changed.find(ob=>ob.id==selectedBusPP.id))return
    if(selectedBusPP){
        bus_pp_list_changed=[...bus_pp_list_changed,selectedBusPP]//....
        //....
    }
}
const saveChange=async()=>{    
    loading=true
    try{
        _.forEach(route_bus_point,async(ob)=>{
            await pb.collection('route_bus_point').delete(ob.id)
        })
        _.forEach(bus_pp_list_changed,async(ob,indx)=>{
            const record={
                route:selectedRoute.id,
                bus_point:ob.id,
                sequence:indx+1
            }
            await pb.collection('route_bus_point').create(record)            
        })
        mesg='Successfully Updated'
        error_mesg=''
    }catch(error1){
        console.log('****',error1)
        error_mesg=error1.message
        mesg=''
    }finally{
        loading=false
    }
}
</script>







<div class="px-4 md:px-8">
    {#if mesg}
        <Alert color="green" dismissable>{mesg}</Alert>
    {/if}
    {#if error_mesg}
        <Alert dismissable>{error_mesg}</Alert>
    {/if}
    {#if data?.status=='error'}
        <Alert dismissable>{data?.error}</Alert>
    {:else}
        <Heading class="mb-4 text-center" tag="h4">Allocate Route</Heading>    
        <div class="border-t grid gap-2 pt-2">
            <div>              
                <Label class="mb-2 text-lg" for="route">Route<span class="ml-2 text-orange-700">*</span></Label>
                <Select bind:value={selectedRoute} id="route" required>
                    {#each data?.routeList as route}      
                        <option value={route}>{route.name} ({route.code})</option>
                    {/each}
                </Select>  
            </div>
            {#if selectedRoute}
                <div class="bg-blue-500 text-white text-lg p-2 rounded">
                    <b>Traveller Name:</b> {selectedRoute?.expand?.traveller?.name}<br/>
                    <b>Traveller Contact:</b> { selectedRoute?.expand?.traveller?.contact_person} ({selectedRoute?.expand?.traveller?.contact_number})<br/>
                    <b>Route:</b> {selectedRoute?.name} ({selectedRoute?.code})              
                </div>
            {/if}
            <div class="mt-2 flex gap-4 md:flex-row place-items-end flex-col">
                <div class="w-full">
                    <Label class="mb-2 text-lg" for="buspoint">Bus Pickup Point<span class="ml-2 text-orange-700">*</span></Label>
                    <Select bind:value={selectedBusPP} id="bus_point" required>
                        <option value="" selected>Select a Bus Point</option>              
                        {#each data?.buspointList as bus_point}          
                            <option value={bus_point}>{bus_point.name}</option>
                        {/each}
                    </Select>                      
                </div>
                <div class="md:w-1/4 mb-1 w-full md:mb-0">
                    <Button color="blue" class="w-full" on:click={addtoRouteList}>+Add To Route List</Button>
                </div>
            </div>
        </div>


        {#if bus_pp_list_changed && bus_pp_list_changed.length>0}
            <div class="shadow mt-4 overflow-auto w-full">       
                <Table>
                    <TableHead>
                            <TableHeadCell>Sr.</TableHeadCell>
                            <TableHeadCell>Bus PPoint</TableHeadCell>
                            <TableHeadCell></TableHeadCell>
                    </TableHead>
                    <TableBody>
                        {#each bus_pp_list_changed as record,indx}
                            <TableBodyRow>
                                <TableBodyCell>{indx+1}</TableBodyCell>
                                <TableBodyCell>{record.name}</TableBodyCell>
                                <TableBodyCell width="10">
                                    <Button size="sm" pill on:click={()=>removeRecord(record)}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M17 22H7C5.89543 22 5 21.1046 5 20V7H3V5H7V4C7 2.89543 7.89543 2 9 2H15C16.1046 2 17 2.89543 17 4V5H21V7H19V20C19 21.1046 18.1046 22 17 22ZM7 7V20H17V7H7ZM9 4V5H15V4H9ZM15 18H13V9H15V18ZM11 18H9V9H11V18Z" fill="currentColor"/> </svg>
                                    </Button>
                                </TableBodyCell>
                            </TableBodyRow>
                        {/each}
                    </TableBody>
                </Table>
            </div>
        {:else}
            <p class="text-orange-700 p-2 text-xl text-center">Empty Table</p>   
        {/if}
        <div class="mt-4 text-right">
            <Button color="blue" on:click={saveChange} class="md:w-48 w-full">
                {#if loading}
                    <Spinner class="mr-4 text-lg" size={4}/> Please Wait....

                
                {:else}
                    Save Change
                {/if}
            </Button>
        </div>
    {/if}
</div>

