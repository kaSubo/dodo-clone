import { CheckoutBentoCard, PaymentDetailsItem } from '@/components/shared';
import { Button, Skeleton } from '@/components/ui';
import { ArrowRight } from 'lucide-react';

interface Props {
	totalPrice: number;
	isLoading?: boolean;
}

const VAT = 9;
const DELIVERY_TAX = 1.7;

export const CheckoutPriceDetails: React.FC<Props> = ({ totalPrice, isLoading }) => {
	const vatPrice = Number(((totalPrice * VAT) / 100).toFixed(2));
	const estimatedPrice = (totalPrice + vatPrice + DELIVERY_TAX).toFixed(2);

	return (
		<CheckoutBentoCard
			className='sticky top-4'
			contentClassName='-pt-7'>
			<div className='flex flex-col gap-1'>
				<h3 className='text-xl'>Estimated total:</h3>
				{isLoading ? (
					<Skeleton className='h-11 w-48' />
				) : (
					<p className='h-11 text-[34px] font-extrabold'>${estimatedPrice}</p>
				)}
			</div>

			<PaymentDetailsItem
				title='Subtotal'
				value={isLoading ? <Skeleton className='h-6 w-16 rounded-[7px]' /> : `$${totalPrice}`}
			/>
			<PaymentDetailsItem
				title='Tax'
				value={isLoading ? <Skeleton className='h-6 w-16 rounded-[7px]' /> : `$${vatPrice}`}
			/>
			<PaymentDetailsItem
				title='Shipping'
				value={isLoading ? <Skeleton className='h-6 w-16 rounded-[7px]' /> : `$${DELIVERY_TAX}`}
			/>

			<Button
				type='submit'
				className='w-full h-14 rounded-2xl mt-6 text-base font-bold'
        loading={isLoading}
        >
				To Checkout
				<ArrowRight
					size={20}
					className='ml-2'
				/>
			</Button>
		</CheckoutBentoCard>
	);
};
