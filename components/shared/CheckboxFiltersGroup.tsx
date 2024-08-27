'use client';

import { FilterCheckbox, Title } from '@/components/shared';
import React from 'react';
import { Input, Skeleton } from '../ui';
import { CheckboxFiltersGroupProps } from '@/types/types';

export const CheckboxFiltersGroup: React.FC<CheckboxFiltersGroupProps> = ({
	className,
	title,
	name,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = 'Search...',
	isLoading,
	onCheckboxClick,
	selectedValues,
	defaultValue,
}) => {
	const [showAll, setShowAll] = React.useState(false);
	const [searchValue, setSearchValue] = React.useState('');

	const renderredItems = showAll
		? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase()))
		: (defaultItems || items).slice(0, limit);

	if (isLoading) {
		return (
			<div className={className}>
				<Title
					text={title}
					size='xs'
					className='font-bold mb-3'
				/>
				{...Array(5)
					.fill(0)
					.map((_, index) => (
						<Skeleton
							key={index}
							className='w-full h-6 mb-4 rounded-[8px]'
						/>
					))}
			</div>
		);
	}

	return (
		<div className={className}>
			<Title
				text={title}
				size='xs'
				className='font-bold mb-3'
			/>
			{showAll && (
				<div className='mb-5'>
					<Input
						onChange={(e) => setSearchValue(e.target.value)}
						placeholder={searchInputPlaceholder}
						className='bg-gray-50 border-gray-200'
					/>
				</div>
			)}
			<div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
				{renderredItems?.map((item, index) => (
					<FilterCheckbox
						key={index}
						value={item.value}
						text={item.text}
						name={name}
						endAdornment={item.endAdornment}
						checked={selectedValues?.has(item.value)}
						onCheckedChange={() => onCheckboxClick?.(item.value)}
					/>
				))}
			</div>
			{items.length > limit && (
				<div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
					<button
						onClick={() => setShowAll(!showAll)}
						className='text-primary mt-3'>
						{showAll ? '- Show less' : '+ Show more'}
					</button>
				</div>
			)}
		</div>
	);
};
