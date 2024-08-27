'use client';

import { updateUserInformation } from '@/app/actions';
import { Container, FormInput, Title } from '@/components/shared';
import { Button } from '@/components/ui';
import { ProfileFormProps } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { signOut } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { signUpFormSchema, SignUpFormValues } from './modals/authModal/forms/schemas';

export const ProfileForm: React.FC<ProfileFormProps> = ({ data }) => {
	const form = useForm({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			fullName: data.fullName,
			email: data.email,
			password: '',
			repeatPassword: '',
		},
	});

	const onSubmit = async (data: SignUpFormValues) => {
		try {
			await updateUserInformation({
				fullName: data.fullName,
				email: data.email,
				password: data.password,
			});

			toast.success('Profile Data changed successfully 📝', {
				icon: '✅',
			});
		} catch (error) {
			console.error('[PROFILE_FORM] Error changing data:', error);
			return toast.error('Error changing profile data', {
				icon: '❌',
			});
		}
	};

	const onClickSignOut = async () => {
		signOut({
			callbackUrl: '/',
		});
	};

	return (
		<Container className='my-10'>
			<Title
				text='Personal Information'
				size='md'
				className='font-bold'
			/>

			<FormProvider {...form}>
				<form
					className='flex flex-col gap-5 w-96 mt-10'
					onSubmit={form.handleSubmit(onSubmit)}>
					<FormInput
						name='email'
						label='Email'
						required
					/>
					<FormInput
						name='fullName'
						label='Full name'
						required
					/>
					<FormInput
						name='password'
						label='New password'
						type='password'
						required
					/>
					<FormInput
						name='repeatPassword'
						label='Confirm password'
						type='password'
						required
					/>
					<Button
						disabled={form.formState.isSubmitting}
						type='submit'
						className='text-base mt-10'>
						Save changes
					</Button>

					<Button
						onClick={onClickSignOut}
						variant='secondary'
						disabled={form.formState.isSubmitting}
						className='text-base'
						type='button'>
						Log Out
					</Button>
				</form>
			</FormProvider>
		</Container>
	);
};
