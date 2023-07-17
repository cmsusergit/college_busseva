<script>
    import { Modal,Navbar, NavLi, NavUl,Label,Input,Button, NavHamburger, Chevron,Avatar, Dropdown, DropdownItem, DropdownHeader, DropdownDivider } from 'flowbite-svelte'

    import pb from '$lib/db'
    import { applyAction,enhance } from '$app/forms';
    import { page } from '$app/stores';
    export let is_auth,showDlg=false
    let record={"id":is_auth.id,
            "password": "",
            "passwordConfirm": "",
            "oldPassword":""
    }

    // const onsubmit=async()=>{
    //     // try{
    //     //     if(record.password.length<8){
    //     //         alert("Password must be greater then 8 character long")
    //     //         return
    //     //     }
    //     //     if(record.password!==record.passwordConfirm){
    //     //         alert("Password & Confirm Password does nt match")
    //     //         return 
    //     //     }
    //     //     await pb.collection('users').update(is_auth.id, record)
    //     //     alert("Password Updated")
    //     // }catch(error1){
    //     //     alert(error1)
    //     //     console.log('****',error1)
    //     // }
    //     // finally{
    //     //     showDlg=false
    //     // }







    // }
</script>     
<Modal bind:open={showDlg} title="Change Password">
    <div>
        <form>
            <div>
                <Label class="mb-2 text-lg" for="cpassword">Current Password</Label>
                <Input bind:value={record.oldPassword} type="password" id="cpassword" required></Input>
            </div>
            <div>
                <Label class="mb-2 text-lg" for="npassword">New Password</Label>
                <Input bind:value={record.password} type="password" id="npassword" required></Input>
            </div>
            <div>
                <Label class="mb-2 text-lg" for="cnpassword">Confirm New Password</Label>
                <Input bind:value={record.passwordConfirm} type="password" id="cnpassword" required></Input>
            </div>
            <div class="my-4 text-right">
                    <Button color="blue" type="submit">SUBMIT</Button>                 
                    <Button on:click={()=>{showDlg=false}} type="button">Close</Button>
            </div>
        </form>    
    </div>
</Modal>
<div class="m-4 border-y">
    {#if is_auth}
        <Navbar class="text-lg p-0" let:hidden let:toggle>
            <Dropdown class="text-lg z-20" placement="bottom" triggeredBy="#avatar-menu">
                <DropdownHeader><span class=""> {is_auth.name}</span></DropdownHeader>
                <DropdownItem on:click={()=>{showDlg=true}} class="text-lg">Change Password</DropdownItem>
                <DropdownDivider />
                <DropdownItem class="text-lg">                    
                    <form style="margin: 0;padding: 0;" method="POST" action="/auth/logout" use:enhance={() => {
                        return async ({ result }) => {
                            pb.authStore.clear()
                            await applyAction(result)
                        }
                        }}>
                        <button>Log out</button>
                    </form>
                </DropdownItem>
            </Dropdown>
            <NavUl {hidden}>
                <NavLi class="text-lg" href="/dashboard" active={$page.route.id=='/dashboard'}>Home</NavLi>                
                <NavLi class="text-lg" href="/" active={$page.route.id=='/'}>Form</NavLi>
                {#if is_auth.role=='ADMIN'}
                    <NavLi class="text-lg cursor-pointer" id="nav-menu1"><Chevron aligned>Manage</Chevron></NavLi>
                    <Dropdown triggeredBy="#nav-menu1" class="w-44 z-20">
                        <DropdownItem><a class="text-lg" href="/route">Route</a></DropdownItem>
                        <DropdownItem><a class="text-lg" href="/route_buspoint">Allocate Route</a></DropdownItem>
                        <DropdownItem><a class="text-lg" href="/course">Course</a></DropdownItem>
                        <DropdownItem><a class="text-lg" href="/department">Department</a></DropdownItem>
                    </Dropdown>
                {/if}
            </NavUl>            
            <Avatar class="m-1 md:m-0" id="avatar-menu" src={pb.files.getUrl(is_auth,is_auth.avatar)} />
            <NavHamburger on:click={toggle} class1="w-full md:flex md:w-auto md:order-1"/>        
        </Navbar>



    
        {/if}
</div>  
