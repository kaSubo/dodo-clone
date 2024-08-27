'use client';

import { ChoosePizzaForm, ChooseProductForm } from '@/components/shared';
import { useCartStore } from '@/store';
import { ProductSelectProps } from '@/types/types';
import React from 'react';
import toast from 'react-hot-toast';

export const ProductSelect: React.FC<ProductSelectProps> = ({ product, onSubmit }) => {
	const [addCartItem, isLoading] = useCartStore((state) => [state.addCartItem, state.isLoading]);

	const firstVariation = product.variations[0];
	const isPizzaForm = Boolean(firstVariation.pizzaType);

	const handleAddToCart = async (productVariationId?: number, ingredients?: number[]) => {
		try {
			const variationId = productVariationId ?? firstVariation.id;
			await addCartItem({
				productVariationId: variationId,
				ingredients,
			});
			toast.success(`${product.name} added to cart`);
		} catch (error) {
			toast.error(`Error adding ${isPizzaForm ? 'pizza' : 'product'} to cart`);
			console.error(`Error adding ${isPizzaForm ? 'pizza' : 'product'} to cart`, error);
		}
		onSubmit?.();
	};

	if (isPizzaForm) {
		return (
			<ChoosePizzaForm
				name={product?.name}
				imageUrl={product?.imageUrl}
				ingredients={product.ingredients}
				variations={product?.variations}
				onSubmit={handleAddToCart}
				isLoading={isLoading}
			/>
		);
	}

	return (
		<ChooseProductForm
			name={product?.name}
			imageUrl={product?.imageUrl}
			price={Number(firstVariation.price)}
			onSubmit={handleAddToCart}
			isLoading={isLoading}
		/>
	);
};
