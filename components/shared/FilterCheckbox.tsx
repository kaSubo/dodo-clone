import React from 'react';
import { Checkbox } from '../ui';
import { FilterCheckboxProps } from '@/types/types';

export const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
	text,
	name,
	value,
	endAdornment,
	onCheckedChange,
	checked,
}) => {
	return (
		<div className='flex items-center space-x-2'>
			<Checkbox
				onCheckedChange={onCheckedChange}
				checked={checked}
				value={value}
				className='rounded-[8px] w-6 h-6'
				id={`Checkbox-${String(name)}-${String(value)}`}
			/>
			<label
				htmlFor={`Checkbox-${String(name)}-${String(value)}`}
				className='leading-none cursor-pointer flex-1 select-none'>
				{text}
			</label>
			{endAdornment}
		</div>
	);
};
