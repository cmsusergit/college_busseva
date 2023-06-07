export const actions = {
    login: async ({request}) => {

        const dt=await request.formData()
        console.log(dt)
    }
};