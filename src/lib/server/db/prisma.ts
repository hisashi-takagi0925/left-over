import { PrismaClient } from '@prisma/client';
import { dev } from '$app/environment';

// 開発環境でのホットリロード時の接続管理
const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		log: dev ? ['query', 'error', 'warn'] : ['error']
	});

if (dev) globalForPrisma.prisma = prisma;

export default prisma;
