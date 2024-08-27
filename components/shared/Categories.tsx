'use client';

import React from 'react';
import { cn } from '@/components/lib';
import Link from 'next/link';
import { useCategoryStore } from '@/store';
import { CategoryProps } from '@/types/types';

export const Categories: React.FC<CategoryProps> = ({ className, categories }) => {
	const activeCategoryId = useCategoryStore((state) => state.activeId);
	return (
		<div className={cn('inline-flex gap-1 bg-gray-50/60 backdrop-blur-sm p-1 rounded-2xl', className)}>
			{categories.map(({ id, name }, index) => (
				<Link
					href={`#${name}`}
					key={index}
					className={cn(
						'flex items-center font-bold h-11 rounded-2xl px-5',
						activeCategoryId === id && 'bg-white shadow-md shadow-gray-300 text-primary'
					)}>
					<button>{name}</button>
				</Link>
			))}
		</div>
	);
};
