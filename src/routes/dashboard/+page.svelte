<script>
    import { page } from '$app/stores'

    import AdminDashboard from '$lib/component/admin.svelte'
    import TravellerDashboard from '$lib/component/traveller.svelte'
    import OperatorDashboard from '$lib/component/operator.svelte'
</script>
<div>
    {#if $page?.data?.profile?.role=='ADMIN'}
        <h1 class="text-xl text-center">ADMIN</h1>        
        <AdminDashboard></AdminDashboard>


    {:else if $page?.data?.profile?.role=='TRAVELLER'}
        <TravellerDashboard is_auth={$page?.data?.profile}></TravellerDashboard>
    {:else if $page?.data?.profile?.role=='OPERATOR'}        
        <OperatorDashboard is_auth={$page?.data?.profile}></OperatorDashboard>
    {:else}
        <h1 class="text-xl text-center">Guest</h1>
    {/if}
</div>