import Image from 'next/image';
import React from 'react';

interface Props {
	src: string;
	name: string;
}

export const CartItemDetailsImage: React.FC<Props> = ({ src, name }) => {
	return (
		<Image
			src={src}
			alt={name}
			width={65}
			height={65}
      className='w-[65px] h-[65px]'
		/>
	);
};
