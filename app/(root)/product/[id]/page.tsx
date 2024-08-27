import { getProducts } from '@/app/actions';
import { Container, ProductSelect } from '@/components/shared';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
	const product = await getProducts(id);
	if (!product) return notFound();

	return (
		<Container className='flex flex-col my-10'>
			<ProductSelect product={product} />
		</Container>
	);
}
