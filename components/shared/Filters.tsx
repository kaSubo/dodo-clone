'use client';

import { CheckboxFiltersGroup, RangeSlider } from '@/components/shared';
import { pizzaTypes, pizzaSizes } from '@/constants';
import { useFilters, useIngredients, useQUeryFilters } from '@/hooks';
import React from 'react';
import { Input } from '../ui';
import { Title } from './Title';

export const Filters: React.FC = ({ className }: { className?: string }) => {
	const { ingredients, isLoading } = useIngredients();
	const filters = useFilters();

	useQUeryFilters(filters);

	const items = ingredients.map((ingredient) => ({ value: String(ingredient.id), text: String(ingredient.name) }));

	const updatePrices = (prices: number[]) => {
		filters.setRange('priceFrom', prices[0]);
		filters.setRange('priceTo', prices[1]);
	};

	return (
		<div>
			<Title
				text='Filter Options'
				size='sm'
				className='mb-5 font-bold'
			/>

			<CheckboxFiltersGroup
				title='Dough Type'
				name='doughType'
				className='mb-5'
				onCheckboxClick={filters.setDoughTypes}
				selectedValues={filters.doughTypes}
				items={pizzaTypes}
			/>

			<CheckboxFiltersGroup
				title='Size'
				name='size'
				className='mb-5'
				onCheckboxClick={filters.setSizes}
				selectedValues={filters.sizes}
				items={pizzaSizes}
			/>

			<div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
				<Title
					text='Price Range'
					size='xs'
					className='font-bold mb-3'
				/>
				<div className='flex gap-3 mb-5'>
					<Input
						type='number'
						placeholder='$ 0'
						min={0}
						max={10}
						value={String(filters.range.priceFrom)}
						onChange={(e) => filters.setRange('priceFrom', Number(e.target.value))}
					/>
					<Input
						type='number'
						placeholder='$ 10'
						min={2}
						max={10}
						value={String(filters.range.priceTo)}
						onChange={(e) => filters.setRange('priceTo', Number(e.target.value))}
					/>
				</div>
				<RangeSlider
					min={0}
					max={10}
					step={0.1}
					value={[filters.range.priceFrom || 0, filters.range.priceTo || 10]}
					onValueChange={updatePrices}
				/>
			</div>

			<div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
				<CheckboxFiltersGroup
					title='Ingredients'
					name='Ingredients'
					className='mt-5'
					limit={6}
					defaultItems={items.slice(0, 6)}
					items={items}
					isLoading={isLoading}
					onCheckboxClick={filters.setIngredients}
					selectedValues={filters.selectedValues}
				/>
			</div>
		</div>
	);
};
