import { CartItemDTO } from '@/services/dto/cart.dto';
import React from 'react';

interface Props {
	orderId: number;
	items: CartItemDTO[];
}

export const SuccessfullOrderEmailTemplate: React.FC<Props> = ({ orderId, items }) => (
	<div>
		<h1>Thank you for shopping at Coco Pizza! 🍕</h1>

		<p>Your order #{orderId} has been successfully paid. Your order is:</p>

		<hr />

		<ul>
			{items.map((item) => (
				<li key={item.id}>
					{item.productVariation.product.name} | ${Number(item.productVariation.price)} x {item.quantity} pc. ={' '}
					${Number(item.productVariation.price) * item.quantity}
				</li>
			))}
		</ul>
	</div>
);
