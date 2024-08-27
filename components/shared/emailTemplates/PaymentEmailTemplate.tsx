import React from 'react';

interface Props {
	orderId: number;
	totalPrice: number;
	paymentUrl: string;
}

export const PaymentEmailTemplate: React.FC<Props> = ({ orderId, totalPrice, paymentUrl }) => (
	<div>
		<h1>Order #{orderId}</h1>

		<p>
			Pay for the order in the amount of <b>${totalPrice}</b>. Follow the <a href={paymentUrl}>link</a> to proceed with
			the payment.
		</p>
	</div>
);
