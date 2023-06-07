<script>
    import pb from '$lib/db.js'

    let email,password
    const login=async()=>{
        const authdt1 = await pb.collection('users').authWithPassword(email,password)
        console.log(authdt1)
    }
</script>

<div>
    <h1 style="text-align: center;">Login</h1>

    <form on:submit|preventDefault={login}>
        <label for="email">Email address</label>
        <input bind:value={email} type="email" id="email" name="email" placeholder="Email address" required>
        <label for="password">Password</label>
        <input bind:value={password} type="password" id="password" name="email" placeholder="Password" required>
        <button type="submit">Login</button>

    </form>
</div>


