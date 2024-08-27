import { sendEmail } from '@/components/lib';
import { SuccessfullOrderEmailTemplate } from '@/components/shared/emailTemplates';
import { prisma } from '@/prisma/prismaClient';
import { CartItemDTO } from '@/services/dto/cart.dto';
import { OrderStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const body = (await req.json()) as PaymentCallbackData;

		const order = await prisma.order.findFirst({
			where: {
				id: Number(body.object.metadata.order_id),
			},
		});

		if (!order) {
			return NextResponse.json({ error: 'Order not found' }, { status: 404 });
		}

		const isSucceeded = body.object.status === 'succeeded';

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				status: isSucceeded ? OrderStatus.SUCCESS : OrderStatus.CANCELLED,
			},
		});

		const items = JSON.parse(order?.items as string) as CartItemDTO[];
		console.log(items);

		if (isSucceeded) {
			await sendEmail(
				order.email,
				'You order has been successfully placed!',
				SuccessfullOrderEmailTemplate({ orderId: order.id, items })
			);
		}
	} catch (error) {
		console.error('[CHECKOUT_CALLBACK] Server error:', error);
		return NextResponse.json({ error: 'Error happened while checking out' }, { status: 500 });
	}
}
