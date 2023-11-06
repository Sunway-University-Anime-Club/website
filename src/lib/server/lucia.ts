import { dev } from '$app/environment';
import { DATABASE_URL } from '$env/static/private';
import { Key } from '$lib/schema/key.schema';
import { Session } from '$lib/schema/session.schema';
import { User, type IUser } from '$lib/schema/user.schema';
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
	getUserAttributes: (userData): Omit<IUser, '_id'> & { userId: string } => {
		return {
			userId: userData.id,
			username: userData.username,
			role: userData.role
		};
	}
});

mongodb.connect(DATABASE_URL, {});
