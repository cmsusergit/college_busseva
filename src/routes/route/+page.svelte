<script>
    import { invalidateAll } from '$app/navigation';

    import { Input,Alert,Button,Heading,Modal,Spinner,Select, Label } from 'flowbite-svelte'    
    import {Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell} from 'flowbite-svelte'
    import pb from '$lib/db.js'
    export let data
    let routeRecord={ 
        "code": '',"name": '',
        "traveller":'',"is_active": true,
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







<div class="m-4 p-4">
    {#if mesg}    
        <Alert color="green">{mesg}</Alert>
    {/if}
    {#if error_mesg}
        <Alert color="red">{error_mesg}</Alert>
    {/if}
    {#if data?.status=='error'}
        <p class="text-orange-700 text-xl">{data?.error}</p>
    {:else}
        <Heading class="mb-4 text-center" tag="h4">Route Management</Heading>    
        <form on:submit|preventDefault={onsubmit}>
            <div class="grid gap-5 grid-cols-2 mt-2">                       
                <div>
                    <Label class="mb-2 text-lg" for="code">Route Code<span class="ml-1 text-orange-700">*</span></Label>            
                    <Input bind:value={routeRecord.code} id="code" type="text" disabled/>
                </div>
                <div>
                    <Label class="mb-2 text-lg" for="name">Route Name<span class="ml-1 text-orange-700">*</span></Label>
                    <Input bind:value={routeRecord.name} id="name" type="text"/>
                </div>
            </div>
            <div class="grid gap-5 grid-cols-{2+1} mt-2">        
                <div>
                    <Label class="mb-2 text-lg" for="city">City<span class="ml-1 text-orange-700">*</span></Label>                        
                    <Select bind:value={routeRecord.city} id="city" required>
                        {#each data?.cityList as city}          
                            <option value={city.id}>{city.name}</option>
                        {/each}
                    </Select>   
                </div>
                <div>
                    <Label class="mb-2 text-lg" for="traveller">Traveller<span class="ml-1 text-orange-700">*</span></Label>
                    <Select bind:value={routeRecord.traveller} id="traveller" required>
                        <option value="" selected>Select Traveller</option>              
                        {#each data?.travellerList as traveller}          
                            <option value={traveller.id}>{traveller.name}</option>
                        {/each}
                    </Select>  
                </div>
                <div>                
                    <Label class="mb-2 text-lg" for="slot1">Slot<span class="ml-1 text-orange-700">*</span></Label>
                    
                    
                    <Select bind:value={routeRecord.slot} id="slot1" required>
                        <option value="" selected>Select Slot</option>              
                        {#each data?.slotList as slot}          
                            <option value={slot.id}>{slot.name}</option>
                        {/each}
                    </Select>           
                </div>
            </div>
            <div class="mt-4 text-right">
                <Button type="submit" class="w-full md:w-1/4" color="blue">
                    {#if loading}
                        <Spinner color="blue" class="mr-4 p-1" size={4}></Spinner>Loading....
                    {:else}
                        SUBMIT
                    {/if}
                </Button>
            </div>
        </form>
        <div class="shadow mt-4 border overflow-auto">       
            <Table>
                <TableHead>
                        <TableHeadCell>Sr.</TableHeadCell>
                        <TableHeadCell>Route Code</TableHeadCell>
                        <TableHeadCell>Route Name</TableHeadCell>
                        <TableHeadCell>Traveller Name</TableHeadCell>
                        <TableHeadCell></TableHeadCell>
                </TableHead>
                <TableBody>
                    {#each data?.routeList as record,indx}
                        <TableBodyRow>
                            <TableBodyCell>{indx+1}</TableBodyCell>
                            <TableBodyCell>{record.code}</TableBodyCell>
                            <TableBodyCell>{record.name}</TableBodyCell>
                            <TableBodyCell>{record?.expand?.traveller.name}</TableBodyCell>
                            <TableBodyCell width="10">

                                <div class="flex gap-2">
                                    <Button color="yellow" size="sm" pill>
                                        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                                    </Button>
                                    <Button on:click={()=>recordToRemove=record} size="sm" pill>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M17 22H7C5.89543 22 5 21.1046 5 20V7H3V5H7V4C7 2.89543 7.89543 2 9 2H15C16.1046 2 17 2.89543 17 4V5H21V7H19V20C19 21.1046 18.1046 22 17 22ZM7 7V20H17V7H7ZM9 4V5H15V4H9ZM15 18H13V9H15V18ZM11 18H9V9H11V18Z" fill="currentColor"/> </svg>
                                    </Button>
                                </div>
                            </TableBodyCell>
                        </TableBodyRow>
                    {/each}
                </TableBody>
            </Table>
        </div>
    {/if}
</div>










{#if recordToRemove}
    <Modal title="Confirm Remove" bind:open={recordToRemove} size="xs" autoclose>
        <div class="text-center p-1">
            <p class="text-lg text-orange-700">Do you Really Want to Remove?</p>
        </div>


        <svelte:fragment slot='footer'>                
            <Button color="blue" on:click={removeRecord(recordToRemove)}>Confirm</Button>
            <Button on:click={()=>recordToRemove=''}>Cancel</Button>
        </svelte:fragment>
    </Modal>
{/if}