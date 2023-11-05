import { auth } from '$lib/server/lucia';
import { handleHooks } from '@lucia-auth/sveltekit';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

//  Temporarily here until I need it to remind myself that I can have a sequence of hooks like this
export const customHandle: Handle = async ({ resolve, event }) => {
	return resolve(event);
};

export const handle: Handle = sequence(handleHooks(auth), customHandle);
