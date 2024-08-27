import { mapDoughVariants } from '@/constants';
import { PizzaSizes, PizzaTypes } from '@/types/types';

export const getCartItemDetails = (
	ingredients: CartStateItem['ingredients'],
	pizzaSize: PizzaSizes,
	pizzaType: PizzaTypes
): string => {
	const details: string[] = [];

	if (pizzaSize && pizzaType) {
		const typeName = mapDoughVariants[pizzaType];
		details.push(`${typeName} ${pizzaSize} sm`);
	}

	if (ingredients) {
		details.push(...ingredients.map((ingredient) => ingredient.name));
	}

	return details.join(', ');
};
