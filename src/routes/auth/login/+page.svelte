<script>
	import { applyAction, enhance } from '$app/forms'

    import { Heading,Input,Button,Alert,Spinner, Label } from 'flowbite-svelte'    
	export let form
</script>
<div class="px-4 md:w-1/2 md:mx-auto md:px-0 w-full">
	{#if form && form.error}<Alert dismissible>{form?.error}</Alert>{/if}
	<form
		method="POST"
		class="card"
		use:enhance={() => {
			return async ({ result }) => {await applyAction(result)		

		}}}>
		<Heading class="text-2xl text-center">Log in</Heading>	
		<div class="grid gap-4">
			<div>
				<Label class="mb-2 text-lg">Email</Label>
				<Input type="email" name="email" placeholder="Email" required/>
			</div>
			<div>
				<Label class="mb-2 text-lg">Password</Label>
				<Input type="password" name="password" placeholder="Password" required/>
			</div>
			<Button type="submit" color="blue" class="mt-2 w-full">Log in</Button>
		</div>	
	</form>
</div>