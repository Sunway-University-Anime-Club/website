import { z } from 'zod';

export const registerSchema = z.object({
	username: z.string().min(2).max(16),
	password: z.string().min(8)
});
