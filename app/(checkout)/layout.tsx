import { Container, Header } from '@/components/shared';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Coco Pizza | Checkout',
	description: 'Delivery of fresh and tasty pizza',
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className='min-h-screen bg-light-300'>
			<Container>
				<Header
					className='border-b-gray-200'
					hasSearch={false}
					hasCartButton={false}
				/>
				{children}
			</Container>
		</main>
	);
}
