import { z } from 'zod';

export const passwordSchema = z.string().min(6, { message: 'Password must be at least 6 characters' });

export const logInFormSchema = z.object({
	email: z.string().email({ message: 'Invalid email' }),
	password: passwordSchema,
});

export const signUpFormSchema = logInFormSchema
	.merge(
		z.object({
			fullName: z.string().min(2, { message: 'Full name must be at least 2 characters' }),
			repeatPassword: passwordSchema,
		})
	)
	.refine((data) => data.password === data.repeatPassword, {
		message: 'Passwords do not match',
		path: ['repeatPassword'],
	});

export type LogInFormValues = z.infer<typeof logInFormSchema>;
export type SignUpFormValues = z.infer<typeof signUpFormSchema>;