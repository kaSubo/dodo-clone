import { CountButtonProps } from '@/types/types';
import React from 'react';
import { CountButtonIcon } from '@/components/shared';

export const CountButton: React.FC<CountButtonProps> = ({ value = 1, size = 'sm', onClick }) => {
	return (
		<div className='inline-flex items-center justify-between gap-3'>
			<CountButtonIcon
				onClick={() => onClick?.('decrement')}
				disabled={value === 1}
				type='decrement'
				size={size}
			/>

			<p className={size === 'sm' ? 'text-sm' : 'text-md'}>{value}</p>

			<CountButtonIcon
				onClick={() => onClick?.('increment')}
				type='increment'
				size={size}
			/>
		</div>
	);
};
