<script>
  import "../app.postcss"

  import Menu from "$lib/component/menu.svelte";
  import Header from "$lib/component/header.svelte";
  import { navigating } from "$app/stores";
  import {Spinner,Modal} from 'flowbite-svelte'
  export let data
  $:loading=$navigating
</script>
<div class="lg:mx-24">
      <Modal bind:open={loading} autoclose>

        <div class="text-xl text-center">
          <Spinner class="mr-4 text-xl" size={8}></Spinner>Please Wait....
        </div>
      </Modal>
    <Header />
    <Menu is_auth="{data?.profile}"/>
    <div class="mx-auto w-full">
      <main class="min-h-screen w-full">
        <slot />
      </main>
    </div>
    <div style="margin:1em;text-align: center;">
      Sardar Vallabhbhai Patel Institute of Technlogy, Vasad
    </div>
</div>












