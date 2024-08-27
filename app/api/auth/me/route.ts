import { getUserSession } from '@/components/lib/getUserSession';
import { prisma } from '@/prisma/prismaClient';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
	try {
		const user = await getUserSession();

		if (!user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const data = await prisma.user.findUnique({
			where: {
				id: Number(user.id),
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
