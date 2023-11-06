import mongodb from 'mongoose';

export enum UserRole {
	MEMBER = 'member',
	PRESIDENT = 'president',
	VICE_PRESIDENT = 'vice-president',
	SECRETARY = 'secretary',
	TREASURER = 'treasurer',
	PR = 'pr-executive',
	IT_MANAGER = 'it-manager',
	EVENT_MANAGER = 'event-manager',
	GRAPHICS_DESIGNER = 'graphics-designer'
}

export interface IUser {
	_id: string;
	username: string;
	role: UserRole;
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
		},
		role: {
			type: String,
			enum: UserRole,
			default: UserRole.MEMBER
		}
	} as const,
	{ _id: false }
);

export const User = mongodb.models['User'] || mongodb.model<IUser>('User', UserSchema);
