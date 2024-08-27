import Image from 'next/image';
import React from 'react';
import { cn } from '@/components/lib';
import { ProductImageProps } from '@/types/types';

export const PizzaImage: React.FC<ProductImageProps> = ({ imageUrl, alt, size }) => {
	return (
		<div className='flex items-center justify-center flex-1 relative w-full min-h-[500px]'>
			<Image
				src={imageUrl}
				alt={alt}
				width={400}
				height={400}
				className={cn('relative left-2 top-2 transition-all z-10 duration-300', {
					'w-[300px] h-[300px]': size === 20,
					'w-[400px] h-[400px]': size === 30,
					'w-[500px] h-[500px]': size === 40,
				})}
			/>
			<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-300/60 h-[450px] w-[450px]' />
			<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-200 h-[370px] w-[370px]' />
		</div>
	);
};
