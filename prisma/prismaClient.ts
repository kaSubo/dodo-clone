import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
	return new PrismaClient();
};

declare global {
	var prismaGobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGobal == prisma;
