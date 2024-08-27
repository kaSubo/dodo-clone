import { prisma } from '@/prisma/prismaClient';
import { calcCartItemTotalPrice } from './calcCartItemTotalPrice';

export const updateCartTotalPrice = async (token: string) => {
	const userCart = await prisma.cart.findFirst({
		where: {
			token,
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

	if (!userCart) return 0;

	const totalPrice = userCart.items.reduce((sum, item) => {
		return Number(sum) + calcCartItemTotalPrice(item);
	}, 0);
  
	return await prisma.cart.update({
		where: {
			id: userCart.id,
		},
		data: {
			totalPrice,
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
};
