import pb from '$lib/db'
export const handle = async ({ event, resolve }) => {

	event.locals.pb = pb
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
	if (event.locals.pb.authStore.isValid) {
		event.locals.user = event.locals.pb.authStore.model;
	}
	if(event.route.id=='/auth/login'){			
		const response = await resolve(event)
		response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }))	
		return response

	}
	if(event.route.id=='/' || event.route.id=='/api/payment'){
		return await resolve(event)
	}
	else if(!event.locals.user){
		return new Response('Redirect',{status:303,headers:{Location:'/auth/login'}})
	}
	const response = await resolve(event)
	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }))
	return response
}
