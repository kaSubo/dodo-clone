import { Title } from '@/components/shared';
import { ChooseProductFormProps } from '@/types/types';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui';

export const ChooseProductForm: React.FC<ChooseProductFormProps> = ({ name, imageUrl, price, onSubmit, isLoading }) => {
	return (
		<div className='flex flex-1 h-full'>
			<div className='flex items-center justify-center flex-1 relative w-full'>
				<Image
					src={imageUrl}
					alt={name}
					className='relaive left-2 top-2 transition-all duration-300 w-[300px] h-[300px]'
					width={300}
					height={300}
				/>
			</div>

			<div className='inline-flex flex-col justify-between gap-3 w-[490px] rounded-[30px] bg-light-300 p-7'>
				<div className='flex flex-col gap-1'>
					<Title
						text={name}
						size='md'
						className='text-2xl text-black font-bold mb-1'
					/>
				</div>

				<Button
					loading={isLoading}
					onClick={() => onSubmit?.()}
					className='h-14 px-10 text-base rounded-[18px] w-full'>
					Add to Cart for {price}&nbsp;$
				</Button>
			</div>
		</div>
	);
};
