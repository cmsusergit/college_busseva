<script>
	import { enhance } from '$app/forms'

	export let form
	let loading = false

	const submitLogin = () => {
		loading = true
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await update()
					break;
				case 'invalid':
					console.log('Invalid credentials')
					await update();
					break;
				case 'error':
					console.log(result.error.message)
					break;
				default:
					await update()
			}
			loading = false
		};
	};
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
	<form
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
	</form>
</div>