'use client';

import { FormInput } from '@/components/shared/forms';
import { Title } from '@/components/shared/Title';
import { Button } from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { logInFormSchema, LogInFormValues } from './schemas';

interface Props {
	onClose: VoidFunction;
}

export const LogInForm: React.FC<Props> = ({ onClose }) => {
	const form = useForm<LogInFormValues>({
		resolver: zodResolver(logInFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: LogInFormValues) => {
    console.log(data)
		try {
			const resp = await signIn('credentials', {
				...data,
				redirect: false,
    }); 

			if (!resp?.ok) {
				throw Error();
			}

			toast.success('Logged in successfully', {
				icon: '✅',
			});

			onClose();
		} catch (error) {
			console.error('[LOGIN_MODAL]: An error occurred while logging in', error);
			toast.error('Ivalid email address or password', {
				icon: '❌',
			});
		}
	};

	return (
		<FormProvider {...form}>
			<form
				className='flex flex-col gap-5'
				onSubmit={form.handleSubmit(onSubmit)}>
				<div className='flex justify-between items-center'>
					<div className='mr-2'>
						<Title
							text='Log in to your account'
							size='md'
							className='font-bold'
						/>
						<p className='text-gray-400'>Enter your email to continue</p>
					</div>
					<Image
						src='/assets/icons/phone-icon.png'
						alt='Phone icon'
						width={60}
						height={60}
					/>
				</div>

				<FormInput
					name='email'
					label='Email'
					type='email'
					required
				/>
				<FormInput
					name='password'
					label='Your password'
					type='password'
					required
				/>

				<Button
					loading={form.formState.isSubmitting}
					className='h-12 text-base'
					type='submit'>
					Log In
				</Button>
			</form>
		</FormProvider>
	);
};
