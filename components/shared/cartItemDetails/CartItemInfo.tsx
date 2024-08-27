import { cn } from '@/components/lib';
import React from 'react';

export const CartItemInfo: React.FC<CartItemInfoProps> = ({ name, details, className }) => {
	return (
		<div className={cn('flex flex-col gap-1', className)}>
			<h2 className='text-lg font-bold flex-1 leading-6'>{name}</h2>
			{details && <p className='text-xs font-extralight tracking-wide text-gray-400'>{details}</p>}
		</div>
	);
};
