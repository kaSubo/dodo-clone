import { getFilterredProducts } from '@/components/lib/getPizzas';
import { Container, Filters, ProductsGroup, Title, TopBar, Stories } from '@/components/shared';
import { GetSearchParams } from '@/types/types';
import { Suspense } from 'react';

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
	const categories = await getFilterredProducts(searchParams);

	return (
		<>
			<Container className='mt-10'>
				<Title
					text='Anything you wish'
					size='lg'
					className='font-extrabold'
				/>
			</Container>
			<TopBar categories={categories.filter((category) => category.products.length > 0)} />

      <Stories />

			<Container className='mt-9 pb-14'>
				<div className='flex gap-24'>
					<div className='w-[250px]'>
						<Suspense>
							<Filters />
						</Suspense>
					</div>
					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							{categories.map(
								(category) =>
									category.products.length > 0 && (
										<ProductsGroup
											key={category.id}
											categoryId={category.id}
											title={category.name}
											products={category.products}
										/>
									)
							)}
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
