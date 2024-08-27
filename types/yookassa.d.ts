declare type PaymentData = {
	id: string;
	status: string;
	amount: Amount;
	description: string;
	recipient: Recipient;
	created_at: string;
	confirmation: Confirmation;
	test: boolean;
	paid: boolean;
	refundable: boolean;
	metadata: Metadata;
};

declare type Amount = {
	value: string;
	currency: string;
};

declare type Recipient = {
	account_id: string;
	gateway_id: string;
};

declare type Confirmation = {
	type: string;
	confirmation_url: string;
};

declare type Metadata = {
	order_id: string;
};

declare type PaymentCallbackData = {
	type: string;
	event: string;
	object: {
		id: string;
		status: string;
		amount: { value: string; currency: 'RUB' };
		income_amount: { value: string; currency: 'RUB' };
		description: string;
		recipient: { account_id: string; gateway_id: string };
		payment_method: {
			type: string;
			id: string;
			saved: boolean;
			title: string;
		};
		captured_at: string;
		created_at: string;
		text: boolean;
		refunded_amount: { value: string; currency: 'RUB' };
		paid: boolean;
		refundable: true;
		metadata: { order_id: string };
		authorization_details: {
			rrn: string;
			auth_code: string;
		};
	};
};
