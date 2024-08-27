import { getCartItemDetails } from '@/components/lib';
import { CheckoutBentoCard, CheckoutProduct, CheckoutProductSkeleton } from '@/components/shared';
import { PizzaSizes, PizzaTypes } from '@/types/types';

interface Props {
	items: CartStateItem[];
	onCountButtonClick: (id: number, quantity: number, type: 'increment' | 'decrement') => void;
	removeCartItem: (id: number) => void;
	isLoading?: boolean;
	className?: string;
}

export const CheckoutCart: React.FC<Props> = ({ items, onCountButtonClick, removeCartItem, isLoading, className }) => {
	return (
		<CheckoutBentoCard
			title='1. Cart'
			className={className}>
			<div className='flex flex-col gap-5'>
				{isLoading && [...Array(4)].map((_, index) => <CheckoutProductSkeleton key={index} />)}
				{!isLoading &&
					items.length > 0 &&
					items.map((item) => (
						<CheckoutProduct
							key={item.id}
							id={item.id}
							name={item.name}
							imageUrl={item.imageUrl}
							quantity={item.quantity}
							price={item.price}
							disabled={item.disabled}
							details={
								item.pizzaSize && item.pizzaType
									? getCartItemDetails(item.ingredients, item.pizzaSize as PizzaSizes, item.pizzaType as PizzaTypes)
									: ''
							}
							onCountButtonClick={(type: 'increment' | 'decrement') => onCountButtonClick(item.id, item.quantity, type)}
							onClickRemove={() => removeCartItem(item.id)}
						/>
					))}
			</div>
		</CheckoutBentoCard>
	);
};
