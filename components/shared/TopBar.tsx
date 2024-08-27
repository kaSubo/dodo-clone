import React from 'react';
import { cn } from '@/components/lib';
import { Categories } from './Categories';
import { Container } from './Container';
import { SortPopup } from './SortPopup';
import { CategoryProps } from '@/types/types';

export const TopBar: React.FC<CategoryProps> = ({ className, categories }) => {
	return (
		<div className={cn('sticky top-0 bg-white/50 backdrop-blur-sm py-5 shadow-lg shadow-black/5 z-10', className)}>
			<Container className='flex items-center justify-between'>
				<Categories categories={categories} />
				<SortPopup />
			</Container>
		</div>
	);
};
