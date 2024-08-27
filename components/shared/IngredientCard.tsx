'use client';

import { IngredientCardProps } from '@/types/types';
import { CircleCheck } from 'lucide-react';
import React from 'react';
import { cn } from '@/components/lib';
import Image from 'next/image';

export const IngredientCard: React.FC<IngredientCardProps> = ({ imageUrl, name, price, isSelected, onClick }) => {
	return (
		<div
			className={cn(
				'flex flex-col items-center p-2 rounded-md w-32 h-[190px] text-center relative cursor-pointer shadow-md bg-white',
				{ 'border border-primary': isSelected }
			)}
			onClick={onClick}>
			{isSelected && <CircleCheck className='absolute top-2 right-2 text-primary' />}
			<div className='flex flex-col gap-1 justify-between h-full'>
				<div className='flex items-center justify-center flex-1'>
					<Image
						src={imageUrl}
						alt={name}
						width={110}
						height={110}
					/>
				</div>
				<div className='text-[12px]'>{name}</div>
				<div className='text-sm font-bold'>$&nbsp;{price.toString()}</div>
			</div>
		</div>
	);
};
