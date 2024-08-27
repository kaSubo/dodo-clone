'use client';

import { ClearFormButton, FormError, RequiredSymbol } from '@/components/shared';
import { Textarea } from '@/components/ui';
import { useFormContext } from 'react-hook-form';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	name: string;
	label?: string;
	required?: boolean;
	className?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({ name, label, required, className, ...props }) => {
	const {
		register,
		formState: { errors },
		watch,
		setValue,
	} = useFormContext();

	const value = watch(name);
	const error = errors[name]?.message as string;

	const onClickClear = () => {
		setValue(name, '');
	};

	return (
		<div className={className}>
			<p className='font-medium mb-2'>
				{label} {required && <RequiredSymbol />}
			</p>
			<div className='relative'>
				<Textarea
					className='h-12 text-md text-base resize-none'
					rows={5}
					{...register(name)}
					{...props}
				/>
				{Boolean(value) && <ClearFormButton onClick={onClickClear} />}
			</div>

			{error && (
				<FormError
					text={error}
					className='mt-2'
				/>
			)}
		</div>
	);
};
