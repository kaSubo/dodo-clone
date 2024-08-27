export const foodCategories: { id: number; name: string }[] = [
	{ id: 1, name: 'Pizza' },
	{ id: 2, name: 'Snacks' },
	{ id: 3, name: 'Drinks' },
	{ id: 4, name: 'Coffee' },
	{ id: 5, name: 'Deserts' },
	{ id: 6, name: 'Combo' },
];

export const ingredients = [
	{
		name: 'Cheese beef slice',
		price: 2.15,
		imageUrl: '/assets/ingredients/cheese-beef-slice.png',
	},
	{
		name: 'Cream mozzarella',
		price: 0.9,
		imageUrl: '/assets/ingredients/cream-mozzarella.png',
	},
	{
		name: 'Parmesan and Cheddar',
		price: 0.9,
		imageUrl: '/assets/ingredients/parmesan-cheddar.png',
	},
	{
		name: 'Spicy paprika halapenyo',
		price: 0.65,
		imageUrl: '/assets/ingredients/spicy-paprika-halapenyo.png',
	},
	{
		name: 'Tender Chicken breast',
		price: 0.9,
		imageUrl: '/assets/ingredients/tender-chicken-breast.png',
	},
	{
		name: 'Champignons',
		price: 0.65,
		imageUrl: '/assets/ingredients/champignons.png',
	},
	{
		name: 'Ham',
		price: 0.9,
		imageUrl: '/assets/ingredients/ham.png',
	},
	{
		name: 'Spicy pepperoni',
		price: 0.9,
		imageUrl: '/assets/ingredients/spicy-pepperoni.png',
	},
	{
		name: 'Spicy chorizo',
		price: 0.9,
		imageUrl: '/assets/ingredients/spicy-chorizo.png',
	},
	{
		name: 'Pickles',
		price: 0.65,
		imageUrl: '/assets/ingredients/pickles.png',
	},
	{
		name: 'Fresh tomatoes',
		price: 0.65,
		imageUrl: '/assets/ingredients/fresh-tomatoes.png',
	},
	{
		name: 'Red onion',
		price: 0.65,
		imageUrl: '/assets/ingredients/red-onion.png',
	},
	{
		name: 'Juicy pineapples',
		price: 0.65,
		imageUrl: '/assets/ingredients/juicy-pineapples.png',
	},
	{
		name: 'Italian herbs',
		price: 0.45,
		imageUrl: '/assets/ingredients/italian-herbs.png',
	},
	{
		name: 'Sweet pepper',
		price: 0.65,
		imageUrl: '/assets/ingredients/sweet-pepper.png',
	},
	{
		name: 'Cheese cubes',
		price: 0.9,
		imageUrl: '/assets/ingredients/cheese-cubes.png',
	},
	{
		name: 'Meatballs',
		price: 0.9,
		imageUrl: '/assets/ingredients/meatballs.png',
	},
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
	{
		name: 'Scrambled eggs with ham and mushrooms',
		imageUrl: '/assets/images/omlette-ham-shrooms.avif',
		categoryId: 2,
	},
	{
		name: 'Scrambled eggs with pepperoni',
		imageUrl: '/assets/images/omlette-pepperoni.avif',
		categoryId: 2,
	},
	{
		name: 'Danwitch with ham and Cheese',
		imageUrl: '/assets/images/danwitch-ham-cheese.avif',
		categoryId: 2,
	},
	{
		name: 'Chicken nuggets',
		imageUrl: '/assets/images/chicken-nuggets.avif',
		categoryId: 2,
	},
	{
		name: 'Potatoes from the oven with sauce 🌱',
		imageUrl: '/assets/images/oven-potatoes-sauce.avif',
		categoryId: 2,
	},
	{
		name: 'Dodster',
		imageUrl: '/assets/images/dodster.avif',
		categoryId: 2,
	},
	{
		name: 'Spicy dodster 🌶️🌶️',
		imageUrl: '/assets/images/spicy-dodster.avif',
		categoryId: 2,
	},
	{
		name: 'Chocolate Milkshake',
		imageUrl: '/assets/images/milkshake-chocolate.avif',
		categoryId: 3,
	},
	{
		name: 'Pina Colada milkshake',
		imageUrl: '/assets/images/milkshake-pina-colada.avif',
		categoryId: 3,
	},
	{
		name: 'Milkshake with Oreo cookies',
		imageUrl: '/assets/images/milkshake-oreo.avif',
		categoryId: 3,
	},
	{
		name: 'Classic milkshake 👶',
		imageUrl: '/assets/images/milkshake-classic.avif',
		categoryId: 3,
	},
	{
		name: 'Ice Cappuccino',
		imageUrl: '/assets/images/coffee-cappuccino-ice.avif',
		categoryId: 4,
	},
	{
		name: 'Caramel Cappuccino Coffee',
		imageUrl: '/assets/images/coffee-cappuccino-caramel.avif',
		categoryId: 4,
	},
	{
		name: 'Coconut Latte Coffee',
		imageUrl: '/assets/images/coffee-latte-coconut.avif',
		categoryId: 4,
	},
	{
		name: 'Cappuccino Coffee',
		imageUrl: '/assets/images/coffee-cappuccino.avif',
		categoryId: 4,
	},
	{
		name: 'Latte Coffee',
		imageUrl: '/assets/images/coffee-latte.avif',
		categoryId: 4,
	},
];
