<script>
	import { applyAction, enhance } from '$app/forms'

</script>
<form
	method="POST"
	class="card"
	use:enhance={() => {
		return async ({ result }) => {await applyAction(result)		
	}}}>
	<h1 class="text-2xl mb-8">Log in</h1>


	<div class="form-control gap-2 mb-4">
		<input
		type="email"
		name="email"
		placeholder="Email"
		class="input input-bordered"
		/>
		<input
		type="password"
		name="password"
		placeholder="Password"
		class="input input-bordered"
		/>
		<button class="btn btn-primary">Log in</button>
	</div>
</form>
<!-- <script>
    import { goto } from '$app/navigation'

	import pb from '$lib/db.js'
	let loading=false
	let email='',password=''
	const onlogin=async()=>{
		try {
			await pb.collection("users").authWithPassword(email,password)
			if (!pb?.authStore?.model?.verified) {
				pb.authStore.clear()
			}

			goto('/dashboard')
		} 		
		catch (error) {
			console.log('****',error)
			alert(error.message)
		}
	}
	// import { enhance } from '$app/forms'
	// export let form
	// let loading = false
	// const submitLogin = () => {
	// 	loading = true
	// 	return async ({ result, update }) => {
	// 		switch (result.type) {
	// 			case 'success':
	// 				await update()
	// 				break;
	// 			case 'invalid':
	// 				console.log('Invalid credentials')
	// 				await update();
	// 				break;
	// 			case 'error':
	// 				console.log(result.error.message)
	// 				break;
	// 			default:
	// 				await update()
	// 		}
	// 		loading = false
	// 	};
	// };
</script>
<div class="container">
	<h2>
		Login to your account
	</h2>
	<p>
		Or <a href="/register" class="text-primary font-medium hover:cursor-pointer hover:underline"
			>register</a
		> if you don't already have an account.
	</p>
	<form on:submit={onlogin}>
		<input bind:value={email} type="email" id="email" label="Email"/>
		<input bind:value={password} type="password" id="password" label="Password"/>
		<div>
			<a href="/reset-password">Forgot Password?</a>
		</div>
		<div>
			<button type="submit" class="" disabled={loading}>Login</button>
        </div>
	</form>
-->
	<!-- <form
		action="?/login"
		method="POST"
		use:enhance={submitLogin}
	>
	<input
			type="email"
			name="email"
			id="email"
			label="Email"
			value={form?.data?.email ?? ''}
			disabled={loading}
		/>
		<input
			type="password"
			name="password"
			id="password"
			label="Password"
			disabled={loading}
		/>
		<div>
			<a
				href="/reset-password"
				class="font-medium text-primary hover:cursor-pointer hover:underline"
			>
				Forgot Password?</a
			>
		</div>
		<div>
			<button type="submit" class="" disabled={loading}>Login</button>

        </div>
		{#if !form?.verified}
			<div class="alert alert-error shadow-lg w-full max-w-lg">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current flex-shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span>You must verify your email before you can login.</span>
				</div>
			</div>
		{/if}


	</form> --><!--
</div> -->
