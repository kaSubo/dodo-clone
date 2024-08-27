import { CartDTO } from '@/services/dto/cart.dto';
import { calcCartItemTotalPrice } from '@/components/lib';

interface ReturnProps {
	items: CartStateItem[];
	totalPrice: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
	const items = data.items.map((item) => ({
		id: item.id,
		quantity: item.quantity,
		name: item.productVariation.product.name,
		imageUrl: item.productVariation.product.imageUrl,
		price: calcCartItemTotalPrice(item),
		pizzaSize: item.productVariation.size,
		pizzaType: item.productVariation.pizzaType,
		disabled: false,
		ingredients: item.ingredients.map((ingredient) => ({
			name: ingredient.name,
			price: Number(ingredient.price),
		})),
	})) as CartStateItem[];

	return {
		items,
		totalPrice: Number(data.totalPrice),
	};
};
