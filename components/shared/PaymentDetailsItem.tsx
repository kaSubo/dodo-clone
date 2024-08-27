import { cn } from '@/components/lib';
import { Package, Percent, Truck } from 'lucide-react';

interface Props {
	title: 'Subtotal' | 'Tax' | 'Shipping';
	value: React.ReactNode;
	className?: string;
}
export const PaymentDetailsItem: React.FC<Props> = ({ title, value, className }) => {
	return (
		<div className={cn('flex items-center my-4', className)}>
			{title === 'Subtotal' ? (
				<Package
					size={16}
					color='#b9b9b9'
					strokeWidth={1}
					className='mr-1'
				/>
			) : title === 'Tax' ? (
				<Percent
					size={16}
					color='#b9b9b9'
					strokeWidth={1}
					className='mr-1'
				/>
			) : (
				<Truck
					size={16}
					color='#b9b9b9'
					strokeWidth={1}
					className='mr-1'
				/>
			)}
			<div className='flex flex-1 text-lg text-neutral-500'>
				{title}:
				<div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-2 mx-2' />
			</div>
			<div className='font-bold text-lg'>{value}</div>
		</div>
	);
};
