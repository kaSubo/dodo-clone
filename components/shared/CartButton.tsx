'use client';

import { Button } from '@/components/ui';
import { useCartStore } from '@/store';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { CartDrawer } from './CartDrawer';
import { cn } from '../lib';

export const CartButton: React.FC = () => {
	const [items, totalPrice, isLoading] = useCartStore((state) => [state.items, state.totalPrice, state.isLoading]);

	return (
		<CartDrawer>
			<Button
				loading={isLoading}
				className={cn('group relative', { 'w-[105px]': isLoading })}>
				<p className='text-bold'>{totalPrice ? `$${' '}${totalPrice}` : '$0'}</p>
				<span className='h-full w-[1px] bg-white/30 mx-3' />
				<div className='flex items-start gap-1 transition duration-300 group-hover:opacity-0'>
					<ShoppingCart
						className='relative'
						strokeWidth={2}
						size={16}
					/>
					<p className='text-bold'>{items.length > 0 ? items.length : 0}</p>
				</div>
				<ArrowRight
					size={20}
					className='absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
				/>
			</Button>
		</CartDrawer>
	);
};
