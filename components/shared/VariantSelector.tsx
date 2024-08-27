'use client';

import React from 'react';
import { cn } from '@/components/lib';
import { GroupVariantProps } from '@/types/types';

export const VariantSelector: React.FC<GroupVariantProps> = ({ items, onClick, selectedValue, className }) => {
	return (
		<div className={cn('flex justify-between bg-light-400 rounded-3xl p-1 select-none', className)}>
			{items.map((item) => (
				<div
					key={item.text}
					className={cn('inline-flex items-center justify-center flex-1', {
						'cursor-pointer': !item.disabled,
						'cursor-not-allowed': item.disabled,
					})}>
					<button
						onClick={() => onClick?.(item.value)}
						className={cn('h-9 px-5 flex-1 rounded-3xl transition-all duration-300 text-sm', {
							'bg-white shadow': item.value === selectedValue,
							'text-gray-400 opacity-50 pointer-events-none': item.disabled,
						})}>
						{item.text}
					</button>
				</div>
			))}
		</div>
	);
};
