import { getCartDetails } from '@/components/lib';
import { Api } from '@/services/apiClient';
import { CreateCartItemValues } from '@/services/dto/cart.dto';
import { create } from 'zustand';

export interface CartState {
	isLoading: boolean;
	error: boolean;
	totalPrice: number;
	items: CartStateItem[];
	disabled?: boolean;
	fetchCartItems: () => Promise<void>;
	updateItemQuantity: (id: number, quantity: number) => Promise<void>;
	addCartItem: (values: any) => Promise<void>;
	removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
	items: [],
	error: false,
	isLoading: true,
	totalPrice: 0,

	fetchCartItems: async () => {
		try {
			set({ isLoading: true, error: false });
			const data = await Api.cart.getCart();
			set(getCartDetails(data));
		} catch (error) {
			console.error('Error fetching cart items:', error);
			set({ error: true });
		} finally {
			set({ isLoading: false });
		}
	},

	updateItemQuantity: async (id: number, quantity: number) => {
		try {
			set({ isLoading: true, error: false });
			const data = await Api.cart.updateItemQuantity(id, quantity);
			set(getCartDetails(data));
		} catch (error) {
			console.error('Error updating item quantity:', error);
			set({ error: true });
		} finally {
			set({ isLoading: false });
		}
	},

	removeCartItem: async (id: number) => {
		try {
			set((state) => ({
				isLoading: true,
				error: false,
				items: state.items.map((item) => (item.id === id ? { ...item, disabled: true } : item)),
			}));
			const data = await Api.cart.removeCartItem(id);
			set(getCartDetails(data));
		} catch (error) {
			console.error('Error deleting cart item:', error);
			set({ error: true });
		} finally {
			set((state) => ({ isLoading: false, items: state.items.map((item) => ({ ...item, disabled: false })) }));
		}
	},

	addCartItem: async (values: CreateCartItemValues) => {
		try {
			set({ isLoading: true, error: false });
			const data = await Api.cart.addCartItem(values);
			set(getCartDetails(data));
		} catch (error) {
			console.error('Error adding item to cart:', error);
			set({ error: true });
		} finally {
			set({ isLoading: false });
		}
	},
}));
