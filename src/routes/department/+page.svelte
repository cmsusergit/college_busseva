<script>
    import { invalidateAll } from '$app/navigation';

    import { Input,Alert,Button,Heading,Modal,Spinner,Select, Label } from 'flowbite-svelte'    
    import {Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell} from 'flowbite-svelte'
    import pb from '$lib/db.js'
    export let data
    let deptRecord={ 
        "name": '',
        "alias":'',
        "course": '',
    }

    let mesg,error_mesg
    let showDlg=false
    let loading=false,recordToRemove
    const onsubmit=async()=>{
        try{
            loading=true
            if(!deptRecord.id)
                await pb.collection('department').create(deptRecord)
            else
                await pb.collection('department').update(deptRecord.id,deptRecord)
            mesg='Successfully Inserted/Updated'
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
    const addRecord=()=>{
        showDlg=true
        deptRecord={ 
            "name": '',
            "alias":'',
            "course": '',
        }
    }
    const updateRecord=(record)=>{
        showDlg=true
        deptRecord=record
    }
    const removeRecord=async(record)=>{
        try{
            loading=true
            record.is_active=false        
            await pb.collection('department').update(record.id, record)
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
        <Alert color="green" dismissable>{mesg}</Alert>
    {/if}
    {#if error_mesg}
        <Alert color="red" dismissable>{error_mesg}</Alert>
    {/if}
    {#if data?.status=='error'}
        <p class="text-orange-700 text-xl" dismissable>{data?.error}</p>
    {:else}
        <Heading class="mb-4 text-center" tag="h4">Departement Management</Heading>    
        {#if showDlg}
            <form on:submit|preventDefault={onsubmit}>
                <div class="grid gap-5 grid-cols-2 mt-2">                       
                    <div>
                        <Label class="mb-2 text-lg" for="name">Name<span class="ml-1 text-orange-700">*</span></Label>            
                        <Input bind:value={deptRecord.name} id="name" type="text" required/>
                    </div>
                    <div>
                        <Label class="mb-2 text-lg" for="alias">Alias<span class="ml-1 text-orange-700">*</span></Label>
                        <Input bind:value={deptRecord.alias} id="alias" type="text" required/>
                    </div>
                </div>
                <div>
                    <Label class="mb-2 text-lg" for="course">Course<span class="ml-1 text-orange-700">*</span></Label>
                    <Select bind:value={deptRecord.course} id="course" required>
                        {#each data?.courseList as course}          
                            <option value={course.id}>{course.name}</option>
                        {/each}
                    </Select>  
                </div>
                <div class="mt-4 justify-end flex gap-4">
                    <Button type="submit" class="w-1/2 md:w-1/4" color="blue">
                        {#if loading}
                            <Spinner color="blue" class="mr-4 p-1" size={4}></Spinner>Loading....
                        {:else}
                            {deptRecord.id?'Update Record':'+New Record'}
                        {/if}
                    </Button>
                    <Button on:click={()=>showDlg=false} class="w-1/2 md:w-1/4" type="button">Close</Button>
                </div>
            </form>
    
        {:else}
            <div class="border px-2 py-2 text-right">
                <Button on:click={addRecord} color="blue" size="sm">+New Record</Button>
            </div>
        {/if}
        <div class="shadow mt-4 border overflow-auto">       
            <Table>
                <TableHead>
                        <TableHeadCell>Sr.</TableHeadCell>    
                        <TableHeadCell>Departement Name</TableHeadCell>
                        <TableHeadCell>Departement Alias</TableHeadCell>
                        <TableHeadCell>Course</TableHeadCell>
                        <TableHeadCell></TableHeadCell>
                </TableHead>
                <TableBody>                    
                    {#each data?.deptList as record,indx}
                        <TableBodyRow>
                            <TableBodyCell>{indx+1}</TableBodyCell>
                            <TableBodyCell>{record.name}</TableBodyCell>
                            <TableBodyCell>{record.alias}</TableBodyCell>
                            <TableBodyCell>{record?.expand?.course.name}</TableBodyCell>
                            <TableBodyCell width="10">
                                <div class="flex gap-2">
                                    <Button on:click={()=>updateRecord(record)} color="yellow" size="sm" pill>
                                        <svg width="24" stroke-width="1.5" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M20 12V5.74853C20 5.5894 19.9368 5.43679 19.8243 5.32426L16.6757 2.17574C16.5632 2.06321 16.4106 2 16.2515 2H4.6C4.26863 2 4 2.26863 4 2.6V21.4C4 21.7314 4.26863 22 4.6 22H11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/> <path d="M8 10H16M8 6H12M8 14H11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/> <path d="M16 5.4V2.35355C16 2.15829 16.1583 2 16.3536 2C16.4473 2 16.5372 2.03725 16.6036 2.10355L19.8964 5.39645C19.9628 5.46275 20 5.55268 20 5.64645C20 5.84171 19.8417 6 19.6464 6H16.6C16.2686 6 16 5.73137 16 5.4Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/> <path d="M17.9541 16.9394L18.9541 15.9394C19.392 15.5015 20.102 15.5015 20.5399 15.9394V15.9394C20.9778 16.3773 20.9778 17.0873 20.5399 17.5252L19.5399 18.5252M17.9541 16.9394L14.963 19.9305C14.8131 20.0804 14.7147 20.2741 14.6821 20.4835L14.4394 22.0399L15.9957 21.7973C16.2052 21.7646 16.3988 21.6662 16.5487 21.5163L19.5399 18.5252M17.9541 16.9394L19.5399 18.5252" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/> </svg>
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

