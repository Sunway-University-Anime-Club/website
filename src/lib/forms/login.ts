import { z } from 'zod';

export const loginSchema = z.object({
	username: z.string().min(2).max(16),
	password: z.string().min(8)
});
