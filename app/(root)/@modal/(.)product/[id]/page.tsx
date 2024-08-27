import { getProducts } from '@/app/actions';
import { parseStringify } from '@/components/lib/utils';
import { ProductSelectModal } from '@/components/shared';
import { notFound } from 'next/navigation';

export default async function ProductModalPage({ params: { id } }: { params: { id: string } }) {
	const product = await getProducts(id);
	const ingredients = parseStringify(product.ingredients);

	if (!product) return notFound();

	return (
		<ProductSelectModal
			product={product}
			ingredients={ingredients}
		/>
	);
}
