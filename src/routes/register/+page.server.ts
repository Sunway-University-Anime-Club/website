import { registerSchema } from '$lib/forms/register';
import { UserRole } from '$lib/schema/user.schema';
import { auth } from '$lib/server/lucia';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth.validate();
	if (session) throw redirect(302, '/');

	const form = await superValidate(event, registerSchema);
	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, registerSchema);
		if (!form.valid) return fail(400, { form });

		await auth.createUser({
			key: {
				providerId: 'username',
				providerUserId: form.data.username,
				password: form.data.password
			},
			attributes: {
				username: form.data.username,
				role: UserRole.MEMBER
			}
		});

		throw redirect(302, '/login');
	}
};
