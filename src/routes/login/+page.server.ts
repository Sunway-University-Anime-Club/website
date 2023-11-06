import { loginSchema } from '$lib/forms/login';
import { auth } from '$lib/server/lucia';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth.validate();
	if (session) throw redirect(302, '/');

	const form = await superValidate(event, loginSchema);
	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, loginSchema);
		if (!form.valid) return fail(400, { form });

		const key = await auth.useKey('username', form.data.username, form.data.password);
		const session = await auth.createSession({
			userId: key.userId,
			attributes: {}
		});

		event.locals.auth.setSession(session);
		throw redirect(302, '/');
	}
};
