import { CreateCartItemValues } from '@/services/dto/cart.dto';
import { useCartStore } from '@/store';
import React from 'react';

interface ReturnProps {
	totalPrice: number;
	items: CartStateItem[];
	isLoading: boolean;
	updateItemQuantity: (id: number, quantity: number) => void;
	addCartItem: (values: CreateCartItemValues) => void;
	removeCartItem: (id: number) => void;
}

export const useCart = (): ReturnProps => {
	const cartState = useCartStore((state) => state);

	React.useEffect(() => {
		cartState.fetchCartItems();
	}, []);

	return cartState;
};
