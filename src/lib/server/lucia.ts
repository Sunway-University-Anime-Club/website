import { dev } from '$app/environment';
import { prisma } from '$lib/server/prisma';
import { prisma as prismaAdapter } from '@lucia-auth/adapter-prisma';
import lucia from 'lucia-auth';

export const auth = lucia({
	adapter: prismaAdapter(prisma),
	env: dev ? 'DEV' : 'PROD',
	transformDatabaseUser: (userData) => {
		return {
			userId: userData.id,
			username: userData.username
		};
	}
});

export type Auth = typeof auth;
