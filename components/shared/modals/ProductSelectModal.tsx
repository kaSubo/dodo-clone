'use client';

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { ProductSelectModalProps } from '@/types/types';

import { ProductSelect } from '@/components/shared';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { useRouter } from 'next/navigation';
import React from 'react';

export const ProductSelectModal: React.FC<ProductSelectModalProps> = ({ product, ingredients }) => {
	const { back } = useRouter();

	return (
		<Dialog
			open={Boolean(product)}
			onOpenChange={() => back()}>
			<VisuallyHidden.Root>
				<DialogTitle>{product?.name}</DialogTitle>
			</VisuallyHidden.Root>
			<DialogContent
				className='p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden'
				aria-describedby='Product select dialog'>
				<ProductSelect
					product={product}
					onSubmit={() => back()}
				/>
				<VisuallyHidden.Root>
					<DialogDescription />
				</VisuallyHidden.Root>
			</DialogContent>
		</Dialog>
	);
};
