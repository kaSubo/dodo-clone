import { getAvailablePizzaSizes } from '@/components/lib';
import { PizzaSizes, PizzaTypes, Variant } from '@/types/types';
import { ProductVariation } from '@prisma/client';
import React from 'react';
import { useSet } from 'react-use';

interface ReturnProps {
	size: PizzaSizes;
	type: PizzaTypes;
	setSize: (size: PizzaSizes) => void;
	setType: (type: PizzaTypes) => void;
	availableSizes: Variant[];
	currentVariationId?: number;
	addIngredient: (id: number) => void;
	selectedIngredients: Set<number>;
}

export const usePizzaOptions = (variations: ProductVariation[]): ReturnProps => {
	const [size, setSize] = React.useState<PizzaSizes>(20);
	const [type, setType] = React.useState<PizzaTypes>(1);
	const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

	const availableSizes = getAvailablePizzaSizes(variations!, type);

	const currentVariationId = variations.find(
		(variation) => variation.size === size && variation.pizzaType === type
	)?.id;

	React.useEffect(() => {
		const isAvailableSize = availableSizes?.find((item) => Number(item.value) === size && !item.disabled);
		const availableSize = availableSizes?.find((item) => !item.disabled);

		if (!isAvailableSize && availableSize) setSize(Number(availableSize.value) as PizzaSizes);
	}, [type]);

	return {
		size,
		type,
		setSize,
		setType,
		availableSizes,
		currentVariationId,
		addIngredient,
		selectedIngredients,
	};
};
