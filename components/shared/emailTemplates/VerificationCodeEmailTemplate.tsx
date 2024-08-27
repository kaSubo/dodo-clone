import { CartItemDTO } from '@/services/dto/cart.dto';
import React from 'react';

interface Props {
	code: string;
}

export const VerificationCodeEmailTemplate: React.FC<Props> = ({ code }) => (
	<div>
		<h1>Your verification code to complete the registration</h1>

		<p>
			One time use only: <h2>{code}</h2>
		</p>

		<p>
			<a href={`http://localhost:3000/api/auth/verify?code=${code}`}>Confirm your email</a>
		</p>
	</div>
);
