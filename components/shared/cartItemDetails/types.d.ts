declare type CartItemInfoProps = {
	name: string;
	details: string;
	className?: string;
};

declare type CartItemProps = {
	imageUrl: string;
	name: string;
	price: number;
	quantity: number;
	id: number;
	details: string;
	className?: string;
	disabled?: boolean;
	onCountButtonClick?: (type: 'increment' | 'decrement') => void;
	onClickRemove?: () => void;
};

declare type CartStateItem = {
	id: number;
	quantity: number;
	name: string;
	imageUrl: string;
	price: number;
	pizzaSize: number | null;
	pizzaType: number | null;
	ingredients: Array<{ name: string; price: number }>;
	disabled?: boolean;
};
