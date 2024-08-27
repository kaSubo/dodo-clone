import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Coco Pizza | Dashboard',
	description: 'Delivery of fresh and tasty pizza',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return <main className='min-h-screen'>{children}</main>;
}
