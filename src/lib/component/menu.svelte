<script>
    import { Navbar, NavLi, NavUl, NavHamburger, Chevron,Avatar, Dropdown, DropdownItem, DropdownHeader, DropdownDivider } from 'flowbite-svelte'

    import pb from '$lib/db'
    import { applyAction,enhance } from '$app/forms';
    import { page } from '$app/stores';
    export let is_auth
</script>     

<div class="m-4 border-y">
    {#if is_auth}
        <Navbar class="text-lg p-0" let:hidden let:toggle>

            <Dropdown class="text-lg z-20" placement="bottom" triggeredBy="#avatar-menu">
                <DropdownHeader>
                    <span class=""> {is_auth.name}</span>
                </DropdownHeader>
                <DropdownItem class="text-lg">Change Password</DropdownItem>
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
                <NavLi class="text-lg cursor-pointer" id="nav-menu1"><Chevron aligned>Manage</Chevron></NavLi>
                <Dropdown triggeredBy="#nav-menu1" class="w-44 z-20">
                    <DropdownItem>
                        <a class="text-lg" href="/route">Route</a>
                    </DropdownItem>
                    <DropdownItem>
                        <a class="text-lg" href="/route_buspoint">Allocate Route</a>
                    </DropdownItem>
                </Dropdown>
            </NavUl>            
            <Avatar id="avatar-menu" src={pb.files.getUrl(is_auth,is_auth.avatar)} />
            <NavHamburger on:click={toggle} class1="w-full md:flex md:w-auto md:order-1"/>        
        </Navbar>
    {/if}
</div>   