import { hashSync } from 'bcrypt';
import { prisma } from './prismaClient';
import { foodCategories, ingredients, products } from './constants';

const randomDecimalNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

async function up() {
	await prisma.user.createMany({
		data: [
			{
				fullName: 'John Doe',
				email: 'johndoe@example.com',
				password: hashSync('111111', 10),
				verified: new Date(),
				role: 'USER',
			},
			{
				fullName: 'Admin',
				email: 'admin@example.com',
				password: hashSync('111111', 10),
				verified: new Date(),
				role: 'ADMIN',
			},
		],
	});

	await prisma.category.createMany({
		data: foodCategories,
	});

	await prisma.ingredient.createMany({
		data: ingredients,
	});

	await prisma.product.createMany({
		data: products,
	});

	const pizza1 = await prisma.product.create({
		data: {
			name: 'Fresh Pepperoni',
			imageUrl: '/assets/images/pepperoni-fresh.avif',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(0, 5),
			},
		},
	});

	const pizza2 = await prisma.product.create({
		data: {
			name: 'Cheesy chicken',
			imageUrl: '/assets/images/cheesy-chicken.avif',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(5, 10),
			},
		},
	});

	const pizza3 = await prisma.product.create({
		data: {
			name: 'Diablo',
			imageUrl: '/assets/images/diablo.avif',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(10, 40),
			},
		},
	});

	await prisma.productVariation.createMany({
		data: [
			//Fresh Pepperoni
			{ productId: pizza1.id, pizzaType: 1, price: Number(3.5), size: 20 },
			{ productId: pizza1.id, pizzaType: 2, price: Number(6.15), size: 30 },
			{ productId: pizza1.id, pizzaType: 2, price: Number(7.45), size: 40 },

			//Cheesy chicken
			{ productId: pizza2.id, pizzaType: 1, price: Number(5.95), size: 20 },
			{ productId: pizza2.id, pizzaType: 1, price: Number(8.85), size: 30 },
			{ productId: pizza2.id, pizzaType: 1, price: Number(10.5), size: 40 },
			{ productId: pizza2.id, pizzaType: 2, price: Number(4.95), size: 20 },
			{ productId: pizza2.id, pizzaType: 2, price: Number(7.85), size: 30 },
			{ productId: pizza2.id, pizzaType: 2, price: Number(9.55), size: 40 },

			//Diablo
			{ productId: pizza3.id, pizzaType: 1, price: Number(6.35), size: 20 },
			{ productId: pizza3.id, pizzaType: 2, price: Number(10.15), size: 30 },
			{ productId: pizza3.id, pizzaType: 2, price: Number(11.65), size: 40 },

			//Other products
			{ productId: 1, price: Number(2.15) },
			{ productId: 2, price: Number(2.15) },
			{ productId: 3, price: Number(3.15) },
			{ productId: 4, price: Number(3.15) },
			{ productId: 5, price: Number(3.45) },
			{ productId: 6, price: Number(2.25) },
			{ productId: 7, price: Number(2.45) },
			{ productId: 8, price: Number(3.45) },
			{ productId: 9, price: Number(2.45) },
			{ productId: 10, price: Number(2.45) },
			{ productId: 11, price: Number(2.55) },
			{ productId: 12, price: Number(2.05) },
			{ productId: 13, price: Number(1.75) },
			{ productId: 14, price: Number(1.75) },
			{ productId: 15, price: Number(1.75) },
			{ productId: 16, price: Number(1.75) },
		],
	});

	await prisma.story.createMany({
		data: [
			{
				previewImageUrl: '/assets/Stories/previews/story-1.webp',
			},
			{
				previewImageUrl: '/assets/Stories/previews/story-2.webp',
			},
			{
				previewImageUrl: '/assets/Stories/previews/story-3.webp',
			},
			{
				previewImageUrl: '/assets/Stories/previews/story-4.webp',
			},
			{
				previewImageUrl: '/assets/Stories/previews/story-2.webp',
			},
			{
				previewImageUrl: '/assets/Stories/previews/story-3.webp',
			},
		],
	});

	await prisma.storyItem.createMany({
		data: [
			{
				storyId: 1,
				imageUrl: '/assets/Stories/items/story-1.webp',
			},
			{
				storyId: 1,
				imageUrl: '/assets/Stories/items/story-2.webp',
			},
			{
				storyId: 1,
				imageUrl: '/assets/Stories/items/story-3.webp',
			},
			{
				storyId: 1,
				imageUrl: '/assets/Stories/items/story-4.webp',
			},
			{
				storyId: 1,
				imageUrl: '/assets/Stories/items/story-5.webp',
			},
		],
	});
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "ProductVariation" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE`;
}

async function main() {
	try {
		await down();
		await up();
	} catch (error) {
		console.error(`Error happened while seeding: ${error}`);
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (error) => {
		console.error(error);
		await prisma.$disconnect();
		process.exit(1);
	});
