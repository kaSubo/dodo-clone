import { CheckoutBentoCard, FormInput } from '@/components/shared';

interface Props {
	className?: string;
}

export const CheckoutPersonalInfo: React.FC<Props> = ({ className }) => {
	return (
		<CheckoutBentoCard title='2. Personal Information' className={className}>
			<div className='grid grid-cols-2 gap-5'>
				<FormInput
					name='firstName'
					className='text-base'
					placeholder='First name'
				/>
				<FormInput
					name='lastName'
					className='text-base'
					placeholder='Last name'
				/>
				<FormInput
					name='email'
					className='text-base'
					placeholder='E-mail'
				/>
				<FormInput
					name='phone'
					className='text-base'
					placeholder='Phone number'
				/>
			</div>
		</CheckoutBentoCard>
	);
};
