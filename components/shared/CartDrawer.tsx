'use client';

import { cn, getCartItemDetails } from '@/components/lib';
import { CartDrawerItem, Title } from '@/components/shared';
import { Button } from '@/components/ui';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { useCart } from '@/hooks';
import { CartDrawerProps, PizzaSizes, PizzaTypes } from '@/types/types';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const CartDrawer: React.FC<React.PropsWithChildren<CartDrawerProps>> = ({ children }) => {
	const { totalPrice, items, updateItemQuantity, removeCartItem } = useCart();
	const [redirecting, setRedirecting] = React.useState(false);

	const onCountButtonClick = (id: number, quantity: number, type: 'increment' | 'decrement') => {
		const newQuantity = type === 'increment' ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, newQuantity);
	};

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className='flex flex-col justify-between pb-0 bg-light-300'>
				<div className={cn('flex flex-col h-full', !totalPrice && 'justify-center')}>
					{totalPrice > 0 && (
						<SheetHeader>
							<SheetTitle>
								You have {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
							</SheetTitle>

							<SheetDescription />
						</SheetHeader>
					)}

					{!totalPrice && (
						<>
							<div className='flex flex-col items-center justify-center w-72 mx-auto'>
								<Image
									src='/assets/images/empty-box.png'
									alt='Empty cart'
									width={120}
									height={120}
								/>
								<Title
									size='sm'
									text='Your cart is empty'
									className='text-center font-bold my-2'
								/>
								<p className='text-center text-neutral-500 mb-5'>Add items to your cart to see them here</p>
								<SheetClose asChild>
									<Button
										className='w-52 h-12 text-base'
										size='lg'>
										<ArrowLeft
											size={20}
											className='mr-2'
										/>
										Go back
									</Button>
								</SheetClose>
							</div>
							<VisuallyHidden>
								<SheetTitle />
								<SheetDescription />
							</VisuallyHidden>
						</>
					)}

					{totalPrice > 0 && (
						<>
							<div className='-mx-6 mt-5 overflow-auto scrollbar flex-1'>
								{items.map((item) => (
									<div
										className='mb-2'
										key={item.id}>
										<CartDrawerItem
											id={item.id}
											name={item.name}
											imageUrl={item.imageUrl}
											quantity={item.quantity}
											price={item.price}
											details={
												item.pizzaSize && item.pizzaType
													? getCartItemDetails(
															item.ingredients,
															item.pizzaSize as PizzaSizes,
															item.pizzaType as PizzaTypes
													  )
													: ''
											}
											disabled={item.disabled}
											onCountButtonClick={(type) => onCountButtonClick(item.id, item.quantity, type)}
											onClickRemove={() => removeCartItem(item.id)}
										/>
									</div>
								))}
							</div>

							<SheetFooter className='-mx-6 bg-white p-8'>
								<div className='w-full'>
									<div className='flex justify-between mb-4'>
										<div className='flex flex-1 text-lg text-neutral-500'>
											Your order:
											<div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
										</div>
										<div className='font-bold text-lg'>{totalPrice}&nbsp;$</div>
									</div>
									<Link href='/checkout'>
										<Button
											onClick={() => setRedirecting(true)}
											loading={redirecting}
											type='submit'
											className='w-full h-12 text-base'>
											Order
											<ArrowRight
												size={20}
												className='ml-2'
											/>
										</Button>
									</Link>
								</div>
							</SheetFooter>
						</>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
};
