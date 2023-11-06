// See https://kit.svelte.dev/docs/types#app

import type { UserRole } from '$lib/schema/user.schema';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: import('lucia').AuthRequest;
		}
		// interface PageData {}
		// interface Platform {}
	}

	declare namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		type DatabaseUserAttributes = {
			username: string;
			role: UserRole;
		};
		// type DatabaseSessionAttributes = {};
	}
}

export {};
