import { Filters, PriceRange } from '@/types/types';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useSet } from 'react-use';

interface ReturnProps extends Filters {
	setDoughTypes: (key: string) => void;
	setSizes: (key: string) => void;
	setRange: (name: keyof PriceRange, value: number) => void;
	setIngredients: (key: string) => void;
}

interface QueryFilters extends PriceRange {
	sizes: string;
	doughTypes: string;
	ingredients: string;
}

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

	/*Dought types filters*/
	const [doughTypes, { toggle: toggleDoughTypes }] = useSet(
		new Set<string>(searchParams.get('doughTypes') ? searchParams.get('doughTypes')?.split(',') : [])
	);

	/*Pizza sizes filters*/
	const [sizes, { toggle: toggleSizes }] = useSet(
		new Set<string>(searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') : [])
	);

	/*Price filters*/
	const [range, setRange] = React.useState<PriceRange>({
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined,
	});

	const updatePrice = (name: keyof PriceRange, value: number) => {
		setRange((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	/*Ingredient filters*/
	const [selectedValues, { toggle: toggleSelectedValues }] = useSet(
		new Set<string>(searchParams.get('ingredients')?.split(','))
	);

	return React.useMemo(
		() => ({
			doughTypes,
			sizes,
			range,
			selectedValues,
			setDoughTypes: toggleDoughTypes,
			setSizes: toggleSizes,
			setRange: updatePrice,
			setIngredients: toggleSelectedValues,
		}),
		[doughTypes, sizes, range, selectedValues]
	);
};
