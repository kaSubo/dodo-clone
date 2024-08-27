'use client';

import { cn } from '@/components/lib';
import { Container } from '@/components/shared';
import { Api } from '@/services/apiClient';
import { StoriesParams } from '@/types/types';
import Image from 'next/image';
import React from 'react';
import { Skeleton } from '@/components/ui';
import { X } from 'lucide-react';
import ReactStories from 'react-insta-stories';

interface Props {
	className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
	const [stories, setStories] = React.useState<StoriesParams[]>([]);
	const [open, setOpen] = React.useState(false);
	const [selectedStory, setSelectedStory] = React.useState<StoriesParams>();

	React.useEffect(() => {
		async function fetchStories() {
			const data = await Api.stories.getStories();
			setStories(data);
		}

		fetchStories();
	}, []);

	const onStoryClick = (story: StoriesParams) => {
		setSelectedStory(story);

		if (story.items.length > 0) {
			setOpen(true);
		}
	};

	return (
		<>
			<Container className={cn('my-10', className)}>
				<div className='flex items-center justify-between gap-2 pb-2 overflow-auto scrollbar'>
					{stories.length === 0 && [
						[...Array(6)].map((_, index) => (
							<Skeleton
								key={index}
								className='w-[200px] h-[250px] rounded-md'
							/>
						)),
					]}
					{stories.map((story) => (
						<Image
							key={story.id}
							src={story.previewImageUrl}
							alt='story preview'
							width={200}
							height={250}
							onClick={() => onStoryClick(story)}
							className='rounded-md cursor-pointer'
						/>
					))}

					{open && (
						<div className='absolute left-0 top-0 w-full h-full bg-black/80 backdrop-blur-sm flex items-center justify-center z-30'>
							<div
								className='relative'
								style={{ width: 520 }}>
								<button
									className='absolute -right-10 -top-5 z-40'
									onClick={() => setOpen(false)}>
									<X
										className='absolute top-0 right-0 text-light-400'
										size={32}
									/>
								</button>
								<ReactStories
									onAllStoriesEnd={() => setOpen(false)}
									stories={selectedStory?.items.map((story) => ({ url: story.imageUrl, duration: 3000 })) || []}
									defaultInterval={3000}
									width={520}
									height={800}
								/>
							</div>
						</div>
					)}
				</div>
			</Container>
		</>
	);
};
