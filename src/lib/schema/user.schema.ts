import mongodb from 'mongoose';

export interface IUser {
	_id: string;
	username: string;
}

const UserSchema = new mongodb.Schema<IUser>(
	{
		_id: {
			type: String,
			required: true
		},
		username: {
			type: String,
			required: true
		}
	} as const,
	{ _id: false }
);

export const User = mongodb.models['User'] || mongodb.model<IUser>('User', UserSchema);
