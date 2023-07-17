<script>    
    import {Table, TableBody, TableBodyCell, TableBodyRow} from 'flowbite-svelte'

    import { onMount } from 'svelte';
    import pb from '$lib/db.js'
    export let profile
    let profileRecord={}
    onMount(()=>{
        profileRecord['Receipt Number']=profile['receipt_number']
        profileRecord['Amount Paid']=profile['amount_paid']
        profileRecord['Payment Date']=profile['payment_date']
        profileRecord['Student Name']=profile['stu_name']

        profileRecord['Student Contact']=profile['stu_contact_number']
        profileRecord['Student Email']=profile['stu_email']
        profileRecord['Parent Contact']=profile['parent_contact_number']

        profileRecord['Bus Picup/Drop Point']=profile['bus_point']
        profileRecord['Traveller']=profile['traveller']
        profileRecord['Payment Type']=profile['payment_type']
        if(profile['transaction_id'])profileRecord['Transaction Id']=profile['transaction_id']
        profileRecord['Course']=profile['course']
        profileRecord['Department']=profile['department']
        profileRecord['Semestr']=profile['sem']
    })
</script>     
<div class="overflow-auto p-2">    
    <div class="flex justify-center w-full p-2">
        <img src={pb.files.getUrl(profile,profile.photo)} alt="" width="140" height="140">
    </div>
    <Table>         
        <TableBody>                    
            {#each Object.entries(profileRecord) as record}
                <TableBodyRow>
                    <TableBodyCell>                        
                        <b>{record[0]}</b>
                    </TableBodyCell>
                    <TableBodyCell>
                        {record[1]}
                    </TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>        

    </Table>
</div>
