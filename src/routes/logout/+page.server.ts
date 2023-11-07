import { auth as lucia } from '$lib/server/lucia';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async (event) => {
		const { auth } = event.locals;

		// Check if the user is logged in and if they are not, then there's no session to invalidate
		const session = await auth.validate();
		if (!session) throw redirect(302, '/');

		// Invalidate the session so that the user is logged out
		lucia.invalidateSession(session.sessionId);
		auth.setSession(null);

		// Delete dead sessions for this user from the database
		await lucia.deleteDeadUserSessions(session.user.userId);

		// Redirect user back to homepage after logging them out
		throw redirect(302, '/');
	}
};
