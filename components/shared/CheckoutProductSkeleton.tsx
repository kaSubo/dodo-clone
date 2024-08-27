import { cn } from '@/components/lib';
import React from 'react';

interface Props {
	className?: string;
}

export const CheckoutProductSkeleton: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('flex items-center justify-between', className)}>
			<div className='flex items-center gap-5'>
				<div className='w-[50px] h-[50px] bg-muted rounded-full animate-pulse' />
				<h2 className='w-40 h-5 bg-muted rounded anim animate-pulse' />
			</div>
			<div className='w-40 h-5 bg-muted rounded anim animate-pulse' />
			<div className='w-[133px] h-8 bg-muted rounded animate-pulse' />
		</div>
	);
};
