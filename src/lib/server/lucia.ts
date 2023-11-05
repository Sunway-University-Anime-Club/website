import { dev } from '$app/environment';
import { DATABASE_URL } from '$env/static/private';
import { Key } from '$lib/schema/key.schema';
import { Session } from '$lib/schema/session.schema';
import { User } from '$lib/schema/user.schema';
import { mongoose } from '@lucia-auth/adapter-mongoose';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import mongodb from 'mongoose';

export const auth = lucia({
	adapter: mongoose({
		User,
		Key,
		Session
	}),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	getUserAttributes: (userData) => {
		return {
			userId: userData.id,
			username: userData.username
		};
	}
});

mongodb.connect(DATABASE_URL, {});
