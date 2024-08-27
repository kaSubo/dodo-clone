import { pizzaSizes } from '@/constants';
import { PizzaTypes, Variant } from '@/types/types';
import { ProductVariation } from '@prisma/client';

export const getAvailablePizzaSizes = (variations: ProductVariation[], type: PizzaTypes): Variant[] => {
	const filteredPizzaVariations = variations?.filter((variation) => variation.pizzaType === type);
	return pizzaSizes.map((item) => ({
		text: item.text,
		value: item.value,
		disabled: !filteredPizzaVariations?.some((variation) => Number(variation.size) === Number(item.value)),
	}));
};
