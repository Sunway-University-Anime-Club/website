import mongodb from 'mongoose';

export interface IKey {
	_id: string;
	user_id: string;
	hashed_password?: string;
}

const KeySchema = new mongodb.Schema<IKey>(
	{
		_id: {
			type: String,
			required: true
		},
		user_id: {
			type: String,
			required: true
		},
		hashed_password: {
			type: String,
			required: false
		}
	} as const,
	{ _id: false }
);

export const Key = mongodb.models['Key'] || mongodb.model<IKey>('Key', KeySchema);
