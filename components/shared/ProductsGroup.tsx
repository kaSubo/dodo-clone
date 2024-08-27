'use client';

import { ProductCard, Title } from '@/components/shared';
import React from 'react';
import { useIntersection } from 'react-use';
import { cn } from '@/components/lib';
import { useCategoryStore } from '@/store';
import { ProductsGroupProps } from '@/types/types';

export const ProductsGroup: React.FC<ProductsGroupProps> = ({ title, products, listClassName, categoryId }) => {
	const setActiveCategory = useCategoryStore((state) => state.setActiveId);
	const intersectionRef = React.useRef(null);
	const intersection = useIntersection(intersectionRef, {
		threshold: 0.4,
	});

	React.useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveCategory(categoryId);
		}
	}, [intersection?.isIntersecting]);

	return (
		<div
			id={title}
			ref={intersectionRef}>
			<Title
				text={title}
				size='lg'
				className='font-extrabold mb-5'
			/>

			<div className={cn('grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[50px]', listClassName)}>
				{products.map((product) => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						imageUrl={product.imageUrl}
						price={Number(product.variations[0].price)}
						ingredients={product.ingredients}
					/>
				))}
			</div>
		</div>
	);
};
