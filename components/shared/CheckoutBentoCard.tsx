import { CheckoutBentoCardProps } from '@/types/types';
import { Title } from '@/components/shared';
import { cn } from '@/components/lib';

export const CheckoutBentoCard: React.FC<React.PropsWithChildren<CheckoutBentoCardProps>> = ({
	title,
	endAdornment,
	contentClassName,
	className,
	children,
}) => {
	return (
		<div className={cn('bg-white rounded-3xl', className)}>
			<div className='px-[35px] py-[30px]'>
				{title && (
					<div className='flex items-center justify-between pb-6 border-b-2 border-gray-100'>
						<Title
							text={title}
							className='font-bold'
						/>
						{endAdornment}
					</div>
				)}
				<div className={cn('pt-7', contentClassName)}>{children}</div>
			</div>
		</div>
	);
};
