import React from 'react';
import { cn } from '@/components/lib';
import { ArrowUpDown } from 'lucide-react';

export const SortPopup: React.FC = ({ className }: { className?: string }) => {
	return (
		<div
			className={cn(
				'inline-flex items-center gap-1 bg-gray-50/60 backdrop-blur-sm px-5 h-14 rounded-2xl cursor-pointer',
				className
			)}>
			<ArrowUpDown size={16} />
			<p>Sort by:</p>
			<p className='text-primary'>popular</p>
		</div>
	);
};
