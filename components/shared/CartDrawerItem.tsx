import React from 'react';

import { X } from 'lucide-react';
import { cn } from '../lib';
import * as CartItem from './cartItemDetails';

export const CartDrawerItem: React.FC<CartItemProps> = ({
	imageUrl,
	name,
	price,
	quantity,
	details,
	disabled,
	onCountButtonClick,
	onClickRemove,
}) => {
	return (
		<div className={cn('flex bg-white p-5 gap-6 relative', { 'opacity-50 pointer-events-none': disabled })}>
			<X
				className='absolute top-3 right-3 cursor-pointer hover:text-gray-600'
				color='#b9b9b9'
				size={16}
				onClick={onClickRemove}
			/>
			<CartItem.Image
				src={imageUrl}
				name={name}
			/>

			<div className='flex-1'>
				<CartItem.Info
					name={name}
					details={details}
				/>

				<hr className='my-3' />

				<div className='flex items-center justify-between'>
					<CartItem.CountButton
						onClick={onCountButtonClick!}
						value={quantity}
					/>

					<div className='flex items-center gap-3'>
						<CartItem.Price value={Number(price.toFixed(2))} />
					</div>
				</div>
			</div>
		</div>
	);
};
