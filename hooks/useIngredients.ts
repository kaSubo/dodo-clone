import { Api } from '@/services/apiClient';
import { Ingredient } from '@prisma/client';
import React from 'react';

export const useIngredients = () => {
	const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
	const [isLoading, setIsLoading] = React.useState(false);

	React.useEffect(() => {
		const fetchIngredients = async () => {
			try {
				setIsLoading(true);
				const ingredients = await Api.ingredients.getAll();
				setIngredients(ingredients);
			} catch (error) {
				console.error(`Error happened while fetching ingredients: ${error}`);
			} finally {
				setIsLoading(false);
			}
		};

		fetchIngredients();
	}, []);

	return { ingredients, isLoading };
};
