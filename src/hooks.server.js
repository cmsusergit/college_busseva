import PocketBase from 'pocketbase';
export const handle = async ({ event, resolve }) => {

    event.locals.pb = new PocketBase('https://few-cpu.pockethost.io')
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')

	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh()
			event.locals.user = structuredClone(event.locals.pb.authStore.model)
		}
	} catch (_) {

        event.locals.pb.authStore.clear()
		event.locals.user = undefined
	}
	const response = await resolve(event)
	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }))
	return response
}




