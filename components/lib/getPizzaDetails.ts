import { totalPizzaPrice } from '@/components/lib';
import { mapDoughVariants } from '@/constants';
import { PizzaSizes, PizzaTypes } from '@/types/types';
import { Ingredient, ProductVariation } from '@prisma/client';

export const getPizzaDetails = (
	variations: ProductVariation[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>,
	type: PizzaTypes,
	size: PizzaSizes
) => {
	const details = `${size} sm, ${mapDoughVariants[type]} dough`;
	const totalPrice = totalPizzaPrice(variations, ingredients, selectedIngredients, type, size);

	return { details, totalPrice };
};
