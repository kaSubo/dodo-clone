const mapPizzaSizes = {
	20: 'Small',
	30: 'Medium',
	40: 'Large',
} as const;

export const pizzaSizes = Object.entries(mapPizzaSizes).map(([value, text]) => ({
	value,
	text,
}));

export const mapDoughVariants = {
  1: 'Traditional',
  2: 'Thin',
} as const;

export const pizzaTypes = Object.entries(mapDoughVariants).map(([value, text]) => ({
	value,
	text,
}));

