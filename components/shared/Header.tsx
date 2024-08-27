'use client';

import { cn } from '@/components/lib';
import { AuthModal, CartButton, Container, ProfileButton, SearchInput } from '@/components/shared';
import { HeaderProps } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

export const Header: React.FC<HeaderProps> = ({ className, hasSearch = true, hasCartButton = true }) => {
	const [openAuthModal, setOpenAuthModal] = React.useState(false);
	const searchParams = useSearchParams();
	const { replace } = useRouter();

	React.useEffect(() => {
		let toastMessage = '';
		if (searchParams.has('paid')) {
			toastMessage = 'Payment successful! We have sent you an email with the details.';
		}
		if (searchParams.has('verified')) {
			toastMessage = 'Successfully verified your account!';
		}
		if (toastMessage) {
			setTimeout(() => {
				replace('/');
				toast.success(toastMessage, {
					icon: '✅',
					duration: 3000,
				});
			}, 500);
		}
	}, []);

	return (
		<header className={cn('border-b', className)}>
			<Container className='flex items-center justify-between py-8'>
				<Link
					href='/'
					className='flex items-center gap-4'>
					<Image
						src='/logo.png'
						alt='logo'
						width={35}
						height={35}
					/>
					<div>
						<h1 className='text-2xl uppercase font-black'>CoCo Pizza</h1>
						<p className='text-sm text-gray-400 leading-3'>can&apos;t get tastier</p>
					</div>
				</Link>

				{hasSearch && (
					<div className='mx-10 flex-1'>
						<SearchInput />
					</div>
				)}

				<div className='flex items-center gap-4 '>
					<AuthModal
						open={openAuthModal}
						onClose={() => setOpenAuthModal(false)}
					/>
					<ProfileButton onSignInClick={() => setOpenAuthModal(true)} />
					{hasCartButton && (
						<div>
							<CartButton />
						</div>
					)}
				</div>
			</Container>
		</header>
	);
};
