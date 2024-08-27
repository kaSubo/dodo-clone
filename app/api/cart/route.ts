import { findOrCreateCart } from '@/app/actions';
import { updateCartTotalPrice } from '@/components/lib/updateCartTotalPrice';
import { prisma } from '@/prisma/prismaClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get('cartToken')?.value;

		if (!token) {
			return NextResponse.json({ totalAmount: 0, items: [] });
		}

		const userCart = await prisma.cart.findFirst({
			where: {
				OR: [
					{
						token,
					},
				],
			},
			include: {
				items: {
					orderBy: {
						createdAt: 'desc',
					},
					include: {
						productVariation: {
							include: {
								product: true,
							},
						},
						ingredients: true,
					},
				},
			},
		});

		return NextResponse.json(userCart);
	} catch (error) {
		console.error('[CART_GET] Server error:', error);
		return NextResponse.json({ error: ' Error happened while getting cart' }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		let token = req.cookies.get('cartToken')?.value;

		if (!token) {
			token = crypto.randomUUID();
		}

		const userCart = await findOrCreateCart(token);

		const data = await req.json();

		const findCartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: userCart.id,
				productVariationId: data.productVariationId,
				ingredients: {
					every: {
						id: { in: data.ingredients },
					},
					some: {},
				},
			},
		});

		if (findCartItem) {
			await prisma.cartItem.update({
				where: {
					id: findCartItem.id,
				},
				data: {
					quantity: findCartItem.quantity + 1,
				},
			});
		} else {
			await prisma.cartItem.create({
				data: {
					cartId: userCart.id,
					productVariationId: data.productVariationId,
					quantity: 1,
					ingredients: { connect: data.ingredients?.map((id: string) => ({ id })) },
				},
			});
		}

		const updatedUserCart = await updateCartTotalPrice(token);

		const resp = NextResponse.json(updatedUserCart);
		resp.cookies.set('cartToken', token);
		return resp;
	} catch (error) {
		console.error('[CART_POST] Server error:', error);
		return NextResponse.json({ error: ' Error happened while creaing cart' }, { status: 500 });
	}
}
