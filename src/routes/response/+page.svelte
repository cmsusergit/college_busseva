<script>    
import {Table,TableBody,TableBodyRow, TableBodyCell,Heading,Button} from 'flowbite-svelte'

import { onMount } from 'svelte'
import {receipt_print} from '$lib/reciept_print.js'
export let data
let responseList
onMount(()=>{
    responseList=[]
    responseList.push({name:"Record Status",value:data.response?.order_status})
    if(data.response?.order_status.includes("Success")){
        responseList.push({name:"Record ID",value:data.response?.order_id})

        responseList.push({name:"Name",value:data.response?.billing_name})     
        responseList.push({name:"Email",value:data.response?.billing_email})
        responseList.push({name:"Tracking ID",value:data.response?.tracking_id})        
        responseList.push({name:"Payment Mode",value:data.response?.payment_mode})
        responseList.push({name:"Amount",value:data.response?.amount})
    }
    else{
        responseList.push({name:"Record ID",value:data.response?.order_id})
        responseList.push({name:"Name",value:data.response?.billing_name})
        responseList.push({name:"Payment Mode",value:data.response?.payment_mode})
        responseList.push({name:"Amount",value:data.response?.amount})
        responseList.push({name:"Status Message",value:data.response?.status_message})
    }
})










const printReceipt=()=>{
    receipt_print(data.response?.order_id)
}
</script>
<div>
    <div class="flex my-2 justify-center rounded">
        <Heading class={`${data.response?.order_status.includes("Success")?'bg-green-500':'bg-orange-500'} text-white text-xl text-center py-4 w-10/12`}>Response From Payment Server</Heading>
    </div>
    {#if responseList}
    <div class="w-10/12 mx-auto">
        <Table>
            <TableBody>
                {#each responseList as record}   
                    <TableBodyRow>
                        <TableBodyCell>{record.name}</TableBodyCell> 
                        <TableBodyCell>{record.value}</TableBodyCell>
                    </TableBodyRow>
                {/each}
            </TableBody>
        </Table>
        
        
        
        
        
        
        
        {#if data.response?.order_status.includes("Success")}
            <div class="flex justify-end p-2 my-4 border">            
                <Button on:click={printReceipt} class="w-48 rounded">Receipt</Button>
            </div>
        {/if}
        <a href="/" class="w-48 p-2 bg-blue-500 text-white rounded text-center">Go to Form Again</a>
    </div>
    {/if}
</div>




