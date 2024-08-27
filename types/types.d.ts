/* eslint-disable no-unused-vars */

import { Ingredient, Prisma, Product, ProductVariation, Story, StoryItem, User } from '@prisma/client';

declare type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

declare type HeaderProps = {
	className?: string;
	hasSearch?: boolean;
	hasCartButton?: boolean;
};

declare type CategoryProps = {
	categories: Category[];
	className?: string;
};

declare type PizzaSizes = 20 | 30 | 40;

declare type PizzaTypes = 1 | 2;

declare type TitleProps = {
	text: string;
	size?: TitleSize;
	className?: string;
};

declare type FilterCheckboxProps = {
	text: string;
	name?: string;
	value: string;
	endAdornment?: React.ReactNode;
	onCheckedChange?: (checked: boolean) => void;
	checked?: boolean;
};

declare type RangeSliderProps = {
	className?: string;
	min: number;
	max: number;
	step: number;
	formatLabel?: (value: number) => string;
	value?: number[] | readonly number[];
	onValueChange?: (values: number[]) => void;
};

declare type PriceRange = {
	priceFrom?: number;
	priceTo?: number;
};

declare type Filters = {
	doughTypes: Set<string>;
	sizes: Set<string>;
	range: PriceRange;
	selectedValues: Set<string>;
};

declare type CheckboxFiltersGroupProps = {
	className?: string;
	title: string;
	name?: string;
	items: FilterCheckboxProps[];
	defaultItems?: FilterCheckboxProps[];
	limit?: number;
	isLoading?: boolean;
	searchInputPlaceholder?: string;
	onCheckboxClick?: (id: string) => void;
	selectedValues: Set<string>;
	defaultValue?: string[];
};

declare type ProductCardProps = {
	id: number;
	name: string;
	price: number;
	imageUrl: string;
	className?: string;
	ingredients?: Ingredient[];
};

declare type ProductsGroupProps = {
	title: string;
	products: ProductWithRelations[];
	className?: string;
	listClassName?: string;
	categoryId: number;
};

declare type ProductImageProps = {
	imageUrl: string;
	className?: string;
	alt: string;
	size: PizzaSizes;
};

declare type Variant = {
	text: string;
	value: string;
	disabled?: boolean;
};

declare type GroupVariantProps = {
	items: readonly Variant[];
	onClick?: (value: Variant['value']) => void;
	selectedValue?: Variant['value'];
	className?: string;
};

declare type ProductSelectProps = {
	product: ProductWithRelations;
	onSubmit?: VoidFunction;
};

declare type ProductSelectModalProps = {
	ingredients: Ingredient[];
	product: ProductWithRelations;
	className?: string;
};

declare type ChoosePizzaFormProps = {
	imageUrl: string;
	name: string;
	ingredients: Ingredient[];
	variations: ProductVariation[];
	onSubmit: (variationId: number, ingredients: number[]) => void;
	isLoading?: boolean;
};

declare type ChooseProductFormProps = {
	imageUrl: string;
	name: string;
	price: number;
	onSubmit: VoidFunction;
	isLoading?: boolean;
};

declare type ProductWithRelations = Product & {
	variations: ProductVariation[];
	ingredients: Ingredient[];
};

declare type IngredientCardProps = {
	imageUrl: string;
	name: string;
	price: Prisma.Decimal;
	isSelected?: boolean;
	onClick?: () => void;
	className?: string;
};

declare type CartDrawerProps = {
	className?: string;
	children: React.ReactNode;
};

declare type CountButtonProps = {
	value?: number;
	size?: 'sm' | 'lg';
	onClick?: (type: 'increment' | 'decrement') => void;
};

declare type CountButtonIconProps = {
	type?: 'increment' | 'decrement';
	size?: CountButtonProps['size'];
	disabled?: boolean;
	onClick?: () => void;
};

declare type GetSearchParams = {
	query?: string;
	sortBy?: string;
	sizes?: string;
	pizzaTypes?: string;
	ingredients?: string;
	priceFrom?: string;
	priceTo?: string;
};

declare type CheckoutBentoCardProps = {
	title?: string;
	endAdornment?: React.ReactNode;
	contentClassName?: string;
	className?: string;
};

declare type AuthModalProps = {
  open: boolean;
  onClose: () => void;
}

declare type ProfileFormProps = {
  data: User;
}

declare type StoriesParams = Story & {
  items: StoryItem[]
} 
