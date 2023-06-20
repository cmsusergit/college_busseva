<script>
    import { applyAction, enhance } from '$app/forms'

    import pb from '$lib/db'
    
    export let is_auth
</script>
<nav style="background: hsl(194.92deg 84.69% 40.98%);color:white;padding-left: 1em;padding-right:1em;">    
    {#if is_auth}
        <ul><li><a class="menuitem_cl" href="/dashboard">Home</a></li></ul>
        <ul>
            <li><a class="menuitem_cl" href="/">Form</a></li>

            <li>
                <details role="list" dir="rtl">
                    <summary aria-haspopup="listbox" role="link" class="menuitem_cl">Manage</summary>
                    <ul role="listbox">
                        <li style="background: hsl(194.92deg 84.69% 40.98%);padding:.2em;"><a class="menuitem_cl" href="/route">Route</a></li>
                        <li style="background: hsl(194.92deg 84.69% 40.98%);padding:.2em;"><a class="menuitem_cl" href="/route_buspoint">Allocate Route</a></li>
                    </ul>
                </details>
            </li>    

            <li role="list" dir="rtl">
                <form style="margin: 0;padding: 0;" method="POST" action="/auth/logout" use:enhance={() => {
                            return async ({ result }) => {
                            pb.authStore.clear()
                            await applyAction(result)
                            }
                        }}>









                    <button style="margin:0;padding: .2em;">Log out</button>
                </form>
            </li>
        </ul>
    {/if}
</nav>
<style>    
    .menuitem_cl{
        color:white;
        font-size: 100%;;
    }

    .menuitem_cl:hover{
        background-color: hsl(194.92deg 84.69% 40.98%);color:white;
        font-weight: bold;
        text-decoration: underline;
    }
</style>