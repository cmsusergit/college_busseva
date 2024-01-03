import { fail, redirect } from '@sveltejs/kit'


// export const load = ({ locals }) => {
// 	if (locals.pb.authStore.isValid) {
// 		throw redirect(303, '/');
// 	}
// };

export const actions={
    default: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData())
    
    try {
        console.log('****',locals.pb);
        await locals.pb
        .collection('users')
        .authWithPassword(data.email, data.password)

    } catch (e) {
        console.error(e)
        return fail(400,{error:e.message})
    }
    throw redirect(303, '/')
    },
}
// import { error, invalid, redirect } from "@sveltejs/kit";
// export const actions = {

//     login: async ({ request, locals }) => {
// 		const formData=await request.formData()
//         const bd=Object.fromEntries(formData)
//         console.log(JSON.stringify(bd))
// 		try {
// 			await locals.pb
// 				.collection("users")
// 				.authWithPassword(bd.email, bd.password);
// 			if (!locals.pb?.authStore?.model?.verified) {

// 				locals.pb.authStore.clear();
//                 return {
// 					verified: false,
// 				};
// 			}
// 		} catch (err) {
// 			console.log("Error: ", err);
// 			throw error(err.status, err.message);
// 		}

// 		throw redirect(303, "/");

// 	},
// }
