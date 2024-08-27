import type { Metadata } from 'next';
import { Header } from '@/components/shared';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'Coco Pizza',
	description: 'Delivery of fresh and tasty pizza',
};

export default function HomeLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<main className='min-h-screen'>
			<Suspense>
				<Header />
			</Suspense>
			{children}
			{modal}
		</main>
	);
}
