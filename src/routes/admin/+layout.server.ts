import { UserRole } from '$lib/schema/user.schema';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	// Check if user is logged in, if there is no session then they are not logged in
	const session = await event.locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	// User should not be able to access any pages under admin if they are simply a member
	if (session.user.role === UserRole.MEMBER) throw redirect(302, '/');
};
