<script>
    import Menu from '$lib/component/menu.svelte'

    import Header from '$lib/component/header.svelte'
    export let data
</script>
<div class="container" data-theme="light">
    <Header/>

    <Menu is_auth={data?.profile}/>
    <div style="margin: 1em;min-height: 100vh;">
        <slot></slot>
    </div>

    <div style="margin:1em;text-align: center;">
        Sardar Vallabhbhai Patel Institute of Technlogy, Vasad
    </div>
</div>
