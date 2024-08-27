'use server';

import { createPayment, sendEmail } from '@/components/lib';
import { getUserSession } from '@/components/lib/getUserSession';
import { parseStringify } from '@/components/lib/utils';
import { PaymentEmailTemplate, VerificationCodeEmailTemplate } from '@/components/shared';
import { CheckoutFormSchemaFields } from '@/components/shared/schemas/checkoutFormSchema';
import { prisma } from '@/prisma/prismaClient';
import { OrderStatus, Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { cookies } from 'next/headers';

export const findOrCreateCart = async (token: string) => {
	let userCart = await prisma.cart.findFirst({
		where: {
			token,
		},
	});

	if (!userCart) {
		userCart = await prisma.cart.create({
			data: {
				token,
			},
		});
	}

	return userCart;
};

export const getProducts = async (id: string) => {
	try {
		const product = await prisma.product.findFirst({
			where: {
				id: Number(id),
			},
			include: {
				ingredients: true,
				variations: {
					orderBy: {
						createdAt: 'desc',
					},
				},
			},
		});
		return parseStringify(product);
	} catch (error) {
		console.warn('Error happened while searching for products:', error);
	}
};

export const getRecommendedProducts = async (id: string) => {
	try {
		const recommendedProducts = await prisma.product.findFirst({
			where: {
				id: Number(id),
			},
			include: {
				category: {
					include: {
						products: {
							include: {
								variations: true,
							},
						},
					},
				},
			},
		});
		return parseStringify(recommendedProducts);
	} catch (error) {
		console.warn('Error happened while getting recommended products:', error);
	}
};

export async function createOrder(data: CheckoutFormSchemaFields) {
	try {
		const cookieStore = cookies();
		const cartToken = cookieStore.get('cartToken')?.value;

		if (!cartToken) {
			throw new Error('Cart token not found');
		}

		const userCart = await prisma.cart.findFirst({
			include: {
				user: true,
				items: {
					include: {
						ingredients: true,
						productVariation: {
							include: {
								product: true,
							},
						},
					},
				},
			},
			where: {
				token: cartToken,
			},
		});

		if (!userCart) {
			throw new Error('Cart not found');
		}

		if (Number(userCart?.totalPrice) === 0) {
			throw new Error('Cart is empty!');
		}

		const order = await prisma.order.create({
			data: {
				token: cartToken,
				fullName: data.firstName + ' ' + data.lastName,
				email: data.email,
				phone: data.phone,
				address: data.address,
				notes: data.notes,
				totalPrice: Number(userCart.totalPrice),
				status: OrderStatus.PENDING,
				items: JSON.stringify(userCart.items),
			},
		});

		await prisma.cart.update({
			where: {
				id: userCart.id,
			},
			data: {
				totalPrice: 0,
			},
		});

		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id,
			},
		});

		const paymentData = await createPayment({
			amount: order.totalPrice,
			orderId: order.id,
			description: `Order #${order.id}`,
		});

		if (!paymentData) {
			throw new Error('Payment data not found');
		}

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				paymentId: paymentData.id,
			},
		});

		const paymentUrl = paymentData.confirmation.confirmation_url;

		await sendEmail(
			data.email,
			`Coco Pizza / Awaiting order #${order.id} payment`,
			PaymentEmailTemplate({
				orderId: order.id,
				totalPrice: order.totalPrice,
				paymentUrl,
			})
		);

		return paymentUrl;
	} catch (error) {
		console.error('[CREATE_ORDER] Server error:', error);
	}
}

export async function updateUserInformation(body: Prisma.UserUpdateInput) {
	try {
		const currentUser = await getUserSession();

		if (!currentUser) {
			throw new Error('User not found');
		}

		const findUser = await prisma.user.findFirst({
			where: {
				id: Number(currentUser.id),
			},
		});

		await prisma.user.update({
			where: {
				id: Number(currentUser.id),
			},
			data: {
				fullName: body.fullName,
				email: body.email,
				password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
			},
		});
	} catch (error) {
		console.error('[UPDATE_USER] Server error:', error);
	}
}

export async function registerUser(body: Prisma.UserCreateInput) {
	try {
    const findUser = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

		if (findUser) {
			if (!findUser.verified) {
				throw new Error('Email is not verified');
			}
			throw new Error('User already exists');
		}

		const createUser = await prisma.user.create({
			data: {
				fullName: body.fullName,
				email: body.email,
				password: hashSync(body.password as string, 10),
			},
		});

		const code = Math.floor(100000 + Math.random() * 900000).toString();

		await prisma.verificationCode.create({
			data: {
				code,
				userId: createUser.id,
			},
		});

		await sendEmail(
			createUser.email,
			`Coco Pizza / Email verification code`,
			VerificationCodeEmailTemplate({
				code,
			})
		);
	} catch (error) {
		console.error('[REGISTER_USER] Server error:', error);
	}
}
