'use client';

import * as CartItemDetails from '@/components/shared/cartItemDetails';
import { X } from 'lucide-react';
import { cn } from '@/components/lib';

export const CheckoutProduct: React.FC<CartItemProps> = ({
	name,
	price,
	imageUrl,
	quantity,
	details,
	disabled,
	className,
	onCountButtonClick,
	onClickRemove,
}) => {
	return (
		<div
			className={cn(
				'flex items-center justify-between [&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-neutral-200/60 [&:not(:last-child)]:pb-7',
				{
					'opacity-50 pointer-events-none': disabled,
				},
				className
			)}>
			<div className='flex flex-1 items-center gap-5'>
				<CartItemDetails.Image
					src={imageUrl}
					name={name}
				/>
				<CartItemDetails.Info
					name={name}
					details={details}
					className='max-w-[70%]'
				/>
			</div>

			<CartItemDetails.Price value={Number(price.toFixed(2))} />

			<div className='flex items-center gap-5 ml-20'>
				<CartItemDetails.CountButton
					onClick={onCountButtonClick}
					value={quantity}
				/>
				<button
					type='button'
					onClick={onClickRemove}>
					<X
						className='cursor-pointer hover:text-gray-600'
						color='#b9b9b9'
						size={20}
					/>
				</button>
			</div>
		</div>
	);
};
