import mongodb from 'mongoose';

export interface ISession {
	_id: string;
	user_id: string;
	active_expires: number;
	idle_expires: number;
}

const SessionSchema = new mongodb.Schema<ISession>(
	{
		_id: {
			type: String,
			required: true
		},
		user_id: {
			type: String,
			required: true
		},
		active_expires: {
			type: Number,
			required: true
		},
		idle_expires: {
			type: Number,
			required: true
		}
	} as const,
	{ _id: false }
);

export const Session =
	mongodb.models['Session'] || mongodb.model<ISession>('Session', SessionSchema);
