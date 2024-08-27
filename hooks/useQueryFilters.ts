import { Filters } from '@/types/types';
import { useRouter } from 'next/navigation';
import qs from 'qs';
import React from 'react';

export const useQUeryFilters = (filters: Filters) => {
	const isMounted = React.useRef(false);
	const { push } = useRouter();

	React.useEffect(() => {
		if (isMounted.current) {
			const params = {
				...filters.range,
				pizzaTypes: Array.from(filters.doughTypes),
				sizes: Array.from(filters.sizes),
				ingredients: Array.from(filters.selectedValues),
			};

			const query = qs.stringify(params, { arrayFormat: 'comma', skipNulls: true });

			push(`?${query}`, {
				scroll: false,
			});
		}

		isMounted.current = true;
	}, [filters]);
};
