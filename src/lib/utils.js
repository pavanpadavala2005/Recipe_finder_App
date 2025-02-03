const COLORS = {
	blue: {
		bg: "bg-[#E6F2FF]",
		badge: "bg-[#B3D9FF]",
	},
	purple: {
		bg: "bg-[#F4EAFB]",
		badge: "bg-[#DCC2F4]",
	},
	yellow: {
		bg: "bg-[#FFF9E6]",
		badge: "bg-[#FFEAB3]",
	},
	teal: {
		bg: "bg-[#E6FBF7]",
		badge: "bg-[#B3F4E6]",
	},
	pink: {
		bg: "bg-[#FDEAF3]",
		badge: "bg-[#FCC2E0]",
	},
	indigo: {
		bg: "bg-[#EDEBFB]",
		badge: "bg-[#CBC4F6]",
	},
	lime: {
		bg: "bg-[#F3FBE6]",
		badge: "bg-[#D8F7B3]",
	},
	cyan: {
		bg: "bg-[#E6FBFE]",
		badge: "bg-[#B3F0F9]",
	},
};

export const getRandomColor = () => {
	const colorNames = Object.keys(COLORS);
	const randomIndex = Math.floor(Math.random() * colorNames.length);
	const randomColorName = colorNames[randomIndex];
	return COLORS[randomColorName];
};

const Random_Restaurants = {
	1: {
		name: "Coastal Spice",
		servings: "25 servings",
		location: "Bapatla",
		price: 200,
	},
	2: {
		name: "Haritha Restaurant",
		servings: "20 servings",
		location: "Bapatla",
		price: 175,
	},
	3: {
		name: "Annapurna Mess",
		servings: "18 servings",
		location: "Chirala",
		price: 190,
	},
	4: {
		name: "Blue Lagoon",
		servings: "22 servings",
		location: "Chirala",
		price: 250,
	},
	5: {
		name: "Grand Coast",
		servings: "30 servings",
		location: "Bapatla",
		price: 300,
	},
	6: {
		name: "Seaview Restaurant",
		servings: "24 servings",
		location: "Chirala",
		price: 275,
	},
	7: {
		name: "Southern Delights",
		servings: "28 servings",
		location: "Bapatla",
		price: 320,
	},
	8: {
		name: "Golden Sand Cafe",
		servings: "26 servings",
		location: "Chirala",
		price: 340,
	},
	9: {
		name: "Rajula's Kitchen",
		servings: "19 servings",
		location: "Bapatla",
		price: 180,
	},
	10: {
		name: "Sunrise Restaurant",
		servings: "27 servings",
		location: "Chirala",
		price: 360,
	},
	11: {
		name: "Oceanic Flavors",
		servings: "32 servings",
		location: "Bapatla",
		price: 410,
	},
	12: {
		name: "Green Leaves Hotel",
		servings: "29 servings",
		location: "Chirala",
		price: 330,
	},
	13: {
		name: "Village Flavors",
		servings: "35 servings",
		location: "Bapatla",
		price: 430,
	},
	14: {
		name: "Chirala Tiffin Center",
		servings: "21 servings",
		location: "Chirala",
		price: 220,
	},
	15: {
		name: "Bapatla Curry House",
		servings: "33 servings",
		location: "Bapatla",
		price: 400,
	},
	16: {
		name: "Beachside Diner",
		servings: "40 servings",
		location: "Chirala",
		price: 450,
	},
	17: {
		name: "South Coast Kitchen",
		servings: "38 servings",
		location: "Bapatla",
		price: 420,
	},
	18: {
		name: "Chirala Paradise",
		servings: "36 servings",
		location: "Chirala",
		price: 440,
	},
	19: {
		name: "Spicy Aroma",
		servings: "34 servings",
		location: "Bapatla",
		price: 390,
	},
	20: {
		name: "Coastal Breeze",
		servings: "31 servings",
		location: "Chirala",
		price: 410,
	},
};

export const getRandomRestaurant = () => {
	const restaurantNames = Object.keys(Random_Restaurants);
	const randomIndex = Math.floor(Math.random() * restaurantNames.length);
	const randomRestaurant = restaurantNames[randomIndex];
	return Random_Restaurants[randomRestaurant];
};
