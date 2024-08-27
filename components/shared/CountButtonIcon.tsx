import { Button } from '@/components/ui';
import { CountButtonIconProps } from '@/types/types';
import { Minus, Plus } from 'lucide-react';
import React from 'react';
import { cn } from '../lib';

export const CountButtonIcon: React.FC<CountButtonIconProps> = ({ size = 'sm', type, disabled, onClick }) => {
	return (
		<Button
			type='button'
			variant='outline'
			disabled={disabled}
			onClick={onClick}
			className={cn(
				'p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400',
				size === 'sm' ? 'w-[30px] h-[30px] rounded-[10px]' : 'w-[38px] h-[38px] rounded-md'
			)}>
			{type === 'increment' ? <Plus size={size === 'sm' ? 16 : 20} /> : <Minus size={size === 'sm' ? 16 : 20} />}
		</Button>
	);
};
