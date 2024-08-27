import { CartItemDTO } from '@/services/dto/cart.dto';

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
	const ingredientsPrice = item.ingredients.reduce((sum, ingredient) => sum + Number(ingredient.price), 0);

	return (ingredientsPrice + Number(item.productVariation.price)) * item.quantity;
};
