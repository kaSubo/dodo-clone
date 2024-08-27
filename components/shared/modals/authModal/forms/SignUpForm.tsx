'use client';

import { FormInput } from '@/components/shared/forms';
import { Title } from '@/components/shared/Title';
import { Button } from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { signUpFormSchema, SignUpFormValues } from './schemas';
import { registerUser } from '@/app/actions';

interface Props {
	onClose: VoidFunction;
}

export const SignUpForm: React.FC<Props> = ({ onClose }) => {
	const form = useForm<SignUpFormValues>({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			email: '',
			fullName: '',
			password: '',
			repeatPassword: '',
		},
	});

	const onSubmit = async (data: SignUpFormValues) => {
		try {
			await registerUser({
				email: data.email,
				fullName: data.fullName,
				password: data.password,
			});

			toast.success('Signed up successfully 📝! Please, confirm your email', {
				icon: '✅',
			});

			onClose();
		} catch (error) {
			console.error('[LOGIN_MODAL]: An error occurred while signing up', error);
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
							text='Create a new account'
							size='md'
							className='font-bold'
						/>
						<p className='text-gray-400'>Enter your details to continue</p>
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
					name='fullName'
					label='Your name'
					required
				/>
				<FormInput
					name='password'
					label='Your password'
					type='password'
					required
				/>
				<FormInput
					name='repeatPassword'
					label='Repeat your password'
					type='password'
					required
				/>

				<Button
					loading={form.formState.isSubmitting}
					className='h-12 text-base'
					type='submit'>
					Sign up
				</Button>
			</form>
		</FormProvider>
	);
};
