import { updateCartTotalPrice } from '@/components/lib/updateCartTotalPrice';
import { prisma } from '@/prisma/prismaClient';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = Number(params.id);
		const data = (await req.json()) as { quantity: number };
		const token = req.cookies.get('cartToken')?.value;

		if (!token) return NextResponse.json({ error: 'No cart token found' }, { status: 401 });

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id,
			},
		});

		if (!cartItem) return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });

		await prisma.cartItem.update({
			where: {
				id,
			},
			data: {
				quantity: data.quantity,
			},
		});

		const updatedUserCart = await updateCartTotalPrice(token);

		return NextResponse.json(updatedUserCart);
	} catch (error) {
		console.error('[CART_PATCH] Server error:', error);
		return NextResponse.json({ error: ' Error happened while updating cart' }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = Number(params.id);
		const token = req.cookies.get('cartToken')?.value;

		if (!token) return NextResponse.json({ error: 'No cart token found' }, { status: 401 });

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id,
			},
		});

		if (!cartItem) return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });

		await prisma.cartItem.delete({
			where: {
				id,
			},
		});

		const updatedUserCart = await updateCartTotalPrice(token);
		return NextResponse.json(updatedUserCart);
	} catch (error) {
		console.error('[CART_DELETE] Server error:', error);
		return NextResponse.json({ error: ' Error happened while deleting cart' }, { status: 500 });
	}
}
