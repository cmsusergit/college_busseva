export const load = ({ locals }) => {
	if (locals.user && locals.user) {
		return {
			profile: JSON.parse(JSON.stringify(locals.user))
		};
	}
}; 