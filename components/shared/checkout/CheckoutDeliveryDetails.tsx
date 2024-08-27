'use client';

import { AddressInput, CheckoutBentoCard, FormError, FormTextarea } from '@/components/shared';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
	className?: string;
}

export const CheckoutDeliveryDetails: React.FC<Props> = ({ className }) => {
	const { control } = useFormContext();

	return (
		<CheckoutBentoCard
			title='3. Delivery Information'
			className={className}>
			<div className='flex flex-col gap-5'>
				<Controller
					control={control}
					name='address'
					render={({ field, fieldState }) => (
						<>
							<AddressInput onChange={field.onChange} />
							{fieldState.error?.message && <FormError text={fieldState.error.message} />}
						</>
					)}
				/>

				<FormTextarea
					rows={5}
					name='notes'
					placeholder='Additional comments/notes'
				/>
			</div>
		</CheckoutBentoCard>
	);
};
