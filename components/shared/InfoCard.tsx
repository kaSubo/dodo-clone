import { cn } from '@/components/lib';
import { Title } from '@/components/shared';
import { Button } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
	title: string;
	text: string;
	imageUrl: string;
	className?: string;
}

export const InfoCard: React.FC<Props> = ({ title, text, imageUrl, className }) => {
	return (
		<div className={cn('flex items-center justify-between w-[840px] gap-12', className)}>
			<div className='flex flex-col'>
				<div className='w-[445px]'>
					<Title
						size='lg'
						text={title}
						className='font-extrabold'
					/>
					<p className='text-gray-400 text-lg'>{text}</p>
				</div>
				<div className='flex gap-5 mt-11'>
					<Link href='/'>
						<Button
							variant='outline'
							className='gap-2'>
							<ArrowLeft />
							Back
						</Button>
					</Link>
					<a href=''>
						<Button
							variant='outline'
							className='text-gray-500 border-gray-400 hover:bg-gray-50'>
							Refresh
						</Button>
					</a>
				</div>
			</div>
			<Image
				src={imageUrl}
				alt={title}
				width={320}
				height={380}
			/>
		</div>
	);
};
