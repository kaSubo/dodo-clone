import { prisma } from '@/prisma/prismaClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const stories = await prisma.story.findMany({
			include: {
				items: true,
			},
		});

		return NextResponse.json(stories);
	} catch (error) {
		console.error('[GET_STORIES] Server error:', error);
	}
}
