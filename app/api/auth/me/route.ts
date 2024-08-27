import { authOptions } from '@/constants/authOptions';
import { prisma } from '@/prisma/prismaClient';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: any, res: any) {
	try {
		const user = await getServerSession(req, res, authOptions);

		if (!user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const data = await prisma.user.findUnique({
			where: {
				id: Number(user.user.id),
			},
			select: {
				fullName: true,
				email: true,
				password: false,
			},
		});

		return NextResponse.json(data);
	} catch (error) {
		console.error('[USER_INFORMATION] Server error:', error);
		return NextResponse.json({ error: 'Error fetching user data' }, { status: 500 });
	}
}
