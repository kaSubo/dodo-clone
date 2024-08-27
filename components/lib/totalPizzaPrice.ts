import { PizzaSizes, PizzaTypes } from '@/types/types';
import { Ingredient, ProductVariation } from '@prisma/client';

export const totalPizzaPrice = (
	variations: ProductVariation[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>,
	type: PizzaTypes,
	size: PizzaSizes
) => {
	const pizzaPrice = Number(
		variations?.find((variation) => variation.pizzaType === type && variation.size === size)?.price || 0
	);
	const totalIngredientsPrice = ingredients
		.filter((ingredient) => selectedIngredients.has(ingredient.id))
		.reduce((acc, ingredient) => acc + Number(ingredient.price), 0);

	return (pizzaPrice + totalIngredientsPrice).toFixed(2);
};
