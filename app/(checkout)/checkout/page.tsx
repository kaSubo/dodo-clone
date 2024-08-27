'use client';

import { createOrder } from '@/app/actions';
import { cn } from '@/components/lib';
import {
  CheckoutCart,
  CheckoutDeliveryDetails,
  CheckoutPersonalInfo,
  CheckoutPriceDetails,
  Container,
  Title,
} from '@/components/shared';
import { checkoutFormSchema, CheckoutFormSchemaFields } from '@/components/shared/schemas/checkoutFormSchema';
import { useCart } from '@/hooks';
import { Api } from '@/services/apiClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
	const { totalPrice, items, updateItemQuantity, removeCartItem, isLoading } = useCart();
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const { data: session } = useSession();

	const form = useForm<CheckoutFormSchemaFields>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			notes: '',
		},
	});

	React.useEffect(() => {
		async function fetchUserInfo() {
			const data = await Api.auth.getMe();
			const [firstName, lastName] = data.fullName.split(' ');

			form.setValue('firstName', firstName);
			form.setValue('lastName', lastName);
			form.setValue('email', data.email);
		}
		if (session) {
			fetchUserInfo();
		}
	}, [session]);

	const onSubmit = async (data: CheckoutFormSchemaFields) => {
		try {
			setIsSubmitting(true);
			const url = await createOrder(data);

			toast.success('Order created successfully! 📝Redirecting to payment...', {
				icon: '✅',
			});

			if (url) {
				location.href = url;
			}
		} catch (error) {
			toast.error('Something went wrong', {
				icon: '❌',
			});
			setIsSubmitting(false);
			console.error('[CHECKOUT] Server error:', error);
		}
	};

	const onCountButtonClick = (id: number, quantity: number, type: 'increment' | 'decrement') => {
		const newQuantity = type === 'increment' ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, newQuantity);
	};

	return (
		<Container className='mt-10'>
			<Title
				text='Checkout'
				size='lg'
				className='font-extrabold mb-8'
			/>

			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='flex gap-11'>
						<div className='flex flex-col gap-11 flex-1 mb-44'>
							<CheckoutCart
								items={items}
								onCountButtonClick={onCountButtonClick}
								removeCartItem={removeCartItem}
								isLoading={isLoading}
							/>

							<CheckoutPersonalInfo className={cn({ 'opacity-40 select-none pointer-events-none': isLoading })} />

							<CheckoutDeliveryDetails className={cn({ 'opacity-40 select-none pointer-events-none': isLoading })} />
						</div>
						<div className='basis-[30%]'>
							<CheckoutPriceDetails
								totalPrice={totalPrice}
								isLoading={isLoading || isSubmitting}
							/>
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	);
}
