<script>
    import { page } from '$app/stores'

</script>
<div>
    {#if $page?.data?.profile?.role=='ADMIN'}
        <h1 class="text-xl text-center">ADMIN</h1>        
    {:else if $page?.data?.profile?.role=='TRAVELLER'}
        <h1 class="text-xl text-center">Traveller</h1>
    {:else if $page?.data?.profile?.role=='OPERATOR'}
        <h1 class="text-xl text-center">Operator</h1>


    {:else}
        <h1 class="text-xl text-center">Guest</h1>
    {/if}
</div>