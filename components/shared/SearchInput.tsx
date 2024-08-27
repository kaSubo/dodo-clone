'use client';

import { Search } from 'lucide-react';
import React from 'react';
import { useClickAway, useDebounce } from 'react-use';
import { cn } from '@/components/lib';
import Link from 'next/link';
import Image from 'next/image';
import { Api } from '@/services/apiClient';
import { Product } from '@prisma/client';

export const SearchInput: React.FC = () => {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [isFocused, setIsFocused] = React.useState(false);
	const [products, setProducts] = React.useState<Product[]>([]);
	const ref = React.useRef(null);

	useClickAway(ref, () => {
		setIsFocused(false);
	});

	useDebounce(
		async () => {
			try {
				const response = await Api.products.search(searchQuery);
				setProducts(response);
			} catch (error) {
				console.error(`Error happened while searching for products: ${error}`);
			}
		},
		250,
		[searchQuery]
	);

	const onProductClick = () => {
		setIsFocused(false);
		setSearchQuery('');
		setProducts([]);
	};

	return (
		<>
			{isFocused && <div className='fixed inset-0 bg-black/50 z-30' />}
			<div
				ref={ref}
				className='flex rounded-2xl flex-1 justify-between relative h-11 z-30'>
				<Search className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400' />
				<input
					className='rounded-2xl outline-none w-full bg-gray-100 pl-11'
					type='text'
					placeholder='Search Pizza...'
					onFocus={() => setIsFocused(true)}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				{products.length > 0 && (
					<div
						className={cn(
							'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
							isFocused && 'visible opacity-100 top-12'
						)}>
						{products.map((product) => (
							<Link
								key={product.id}
								href={`/product/${product.id}`}
								className='flex items-center gap-3 px-3 py-2 hover:bg-primary/5'
								onClick={onProductClick}>
								<Image
									src={product.imageUrl}
									alt={product.name}
									width={32}
									height={32}
									className='rounded-full object-cover'
								/>
								<div>{product.name}</div>
							</Link>
						))}
					</div>
				)}
			</div>
		</>
	);
};
