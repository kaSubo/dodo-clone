import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Title } from '@/components/shared';
import { Button } from '../ui';
import { Plus } from 'lucide-react';
import { ProductCardProps } from '@/types/types';

export const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, imageUrl, ingredients }) => {
	return (
		<div>
			<Link
				href={`/product/${id}`}
				className='flex flex-col justify-between h-full'>
				<div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
					<Image
						src={imageUrl}
						alt={name}
						width={212}
						height={212}
					/>
				</div>
				<Title
					text={name}
					size='sm'
					className='mb-1 mt-3 font-bold'
				/>
				<p className='text-sm text-gray-400'>{ingredients?.map((ingredient) => ingredient.name).join(', ')}</p>
				<div className='flex justify-between items-center mt-4'>
					<p className='text-[20px]'>
						from&nbsp;<span className='font-bold'>$&nbsp;{price}</span>
					</p>
					<Button
						variant='secondary'
						className='text-base font-bold'>
						<Plus
							size={20}
							className='mr-1'
						/>
						Add to cart
					</Button>
				</div>
			</Link>
		</div>
	);
};
