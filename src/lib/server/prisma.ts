import { dev } from '$app/environment';
import { PrismaClient } from '@prisma/client/edge';

const prisma = global.prisma || new PrismaClient();
if (dev) global.prisma = prisma;

export { prisma };
