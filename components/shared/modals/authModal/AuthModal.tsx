import { Button } from '@/components/ui';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AuthModalProps } from '@/types/types';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import { LogInForm, SignUpForm } from '@/components/shared';

export const AuthModal: React.FC<AuthModalProps> = ({ open, onClose }) => {
	const [type, setType] = React.useState<'login' | 'signup'>('login');

	const onTypeSwitch = () => setType(type === 'login' ? 'signup' : 'login');

	const handleClose = () => onClose();

	return (
		<Dialog
			open={open}
			onOpenChange={handleClose}>
			<DialogContent className='w-[450px] bg-white p-10'>
				{type === 'login' ? <LogInForm onClose={handleClose} /> : <SignUpForm onClose={handleClose} />}

				<hr />
				<p className='text-center text-sm'>Or continue with:</p>
				<div className='flex gap-2'>
					<Button
						variant='secondary'
						onClick={() =>
							signIn('github', {
								callbackUrl: '/',
								redirect: true,
							})
						}
						type='button'
						className='gap-2 h-12 p-2 flex-1'>
						<Image
							src='/assets/icons/github.svg'
							alt='GitHub icon'
							width={24}
							height={24}
						/>
						GitHub
					</Button>
					<Button
						variant='secondary'
						onClick={() =>
							signIn('google', {
								callbackUrl: '/',
								redirect: true,
							})
						}
						type='button'
						className='gap-2 h-12 p-2 flex-1'>
						<Image
							src='/assets/icons/google.svg'
							alt='GitHub icon'
							width={24}
							height={24}
						/>
						Google
					</Button>
				</div>
				<Button
					variant='outline'
					onClick={onTypeSwitch}
					type='button'
					className='h-12'>
					{type !== 'login' ? 'Log in' : 'Sign up'}
				</Button>
			</DialogContent>
		</Dialog>
	);
};
