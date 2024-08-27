'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
	onChange: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
	return (
		<AddressSuggestions
			token='f73e4d9dbe7f6c18cea8aba6d07b3456cedb5970'
			uid='dadata-address-order-page'
			onChange={(data) => onChange(data?.value)}
			inputProps={{
				className: 'dadata-input',
			}}
			selectOnBlur
		/>
	);
};
