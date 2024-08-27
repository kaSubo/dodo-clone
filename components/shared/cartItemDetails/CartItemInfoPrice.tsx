import React from 'react';

interface Props {
	value: number;
}

export const CartItemInfoPrice: React.FC<Props> = ({ value }) => {
	return <h2 className='font-bold'>{value}&nbsp;$</h2>;
};
