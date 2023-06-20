<script>
  import "../app.postcss";

  import Menu from "$lib/component/menu.svelte";
  import Header from "$lib/component/header.svelte";
  export let data;
</script>
<div class="lg:mx-24">
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


