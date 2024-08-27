'use client';

import { getPizzaDetails } from '@/components/lib';
import { IngredientCard, PizzaImage, Title, VariantSelector } from '@/components/shared';
import { pizzaTypes } from '@/constants';
import { usePizzaOptions } from '@/hooks';
import { ChoosePizzaFormProps, PizzaSizes, PizzaTypes } from '@/types/types';
import React from 'react';
import { Button } from '@/components/ui';

export const ChoosePizzaForm: React.FC<ChoosePizzaFormProps> = ({
	name,
	imageUrl,
	ingredients,
	variations,
	onSubmit,
	isLoading,
}) => {
	const { size, type, setSize, setType, availableSizes, currentVariationId, addIngredient, selectedIngredients } =
		usePizzaOptions(variations);

	const { details, totalPrice } = getPizzaDetails(variations, ingredients, selectedIngredients, type, size);

	const handleAddToCart = () => {
		if (currentVariationId) {
			onSubmit(currentVariationId, Array.from(selectedIngredients));
		}
	};

	return (
		<div className='flex flex-1 h-full'>
			<PizzaImage
				imageUrl={imageUrl}
				alt={name}
				size={size}
			/>

			<div className='inline-flex flex-col justify-between gap-3 w-[490px] rounded-[30px] bg-light-300 p-7'>
				<div className='flex flex-col gap-1'>
					<Title
						text={name}
						size='md'
						className='text-2xl text-black font-bold mb-1'
					/>

					<p className='text-gray-400'>{details}</p>

					<div className='flex flex-col gap-2.5'>
						<VariantSelector
							items={availableSizes}
							selectedValue={String(size)}
							onClick={(value) => setSize(Number(value) as PizzaSizes)}
						/>

						<VariantSelector
							items={pizzaTypes}
							selectedValue={String(type)}
							onClick={(value) => setType(Number(value) as PizzaTypes)}
						/>
					</div>
				</div>

				<div className='bg-light-400 p-5 rounded-md h-[420px] overflow-auto scrollbar'>
					<div className='grid grid-cols-3 gap-3'>
						{ingredients.map((ingredient) => (
							<IngredientCard
								key={ingredient.id}
								imageUrl={ingredient.imageUrl}
								name={ingredient.name}
								price={ingredient.price}
								isSelected={selectedIngredients.has(ingredient.id)}
								onClick={() => addIngredient(ingredient.id)}
							/>
						))}
					</div>
				</div>

				<Button
					loading={isLoading}
					onClick={handleAddToCart}
					className='h-14 px-10 text-base rounded-[18px] w-full'>
					Add to Cart for $&nbsp;{totalPrice}
				</Button>
			</div>
		</div>
	);
};
