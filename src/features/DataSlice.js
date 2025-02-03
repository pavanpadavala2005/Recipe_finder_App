import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRandomColor, getRandomRestaurant } from "../lib/utils";

const initialState = {
	recipes: [],
	isLoading: "idle",
	error: null,
	searchTerm: "chicken",
	favorites: [],
	cartItems: [],
	isAddToCartLoading: false,
	totalBill: 0,
};

export const fetchData = createAsyncThunk("data/fetchData", async (_, { getState }) => {
	const { searchTerm } = getState().data;
	// const API_URL = `https://forkify-api.herokuapp.com/api/search?q=${searchTerm}`; //This is V1 API
	const API_URL = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchTerm}`; // This is V2 API

	try {
		const response = await fetch(API_URL);
		const { data } = await response.json();
		return data.recipes;
	} catch (error) {
		return error.message;
	}
});

export const DataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		setSearchTerm: {
			reducer: (state, action) => {
				state.searchTerm = action.payload;
				state.isLoading = "loading";
			},
			prepare: (payload) => ({ payload: payload }),
		},
		toggleIsFavorite: (state, action) => {
			const allItems = state.recipes.map((recipe) => {
				return recipe.recipe_id === action.payload
					? { ...recipe, isFavorite: !recipe.isFavorite }
					: recipe;
			});
			state.recipes = allItems;
		},
		addedToCart: {
			reducer: (state, action) => {
				const existingItem = state.cartItems.find(
					(item) => item.recipe_id === action.payload.recipe_id
				);
				if (!existingItem) {
					const item = state.recipes.find(
						(item) => item.recipe_id === action.payload.recipe_id
					);
					state.isAddToCartLoading = true;
					const { title, recipe_id, image_url } = item;
					state.cartItems.push({
						recipe_id,
						title,
						image_url,
						quantity: 1,
						price: action.payload.price,
						totalPrice: action.payload.price,
						isInCart: true,
					});
					state.totalBill += action.payload.price;
					state.isAddToCartLoading = false;
				}
				state.recipes = state.recipes.map((recipe) =>
					recipe.recipe_id === action.payload.recipe_id
						? { ...recipe, isInCart: true }
						: recipe
				);
			},
			prepare(payload) {
				return { payload: { ...payload, isInCart: true } };
			},
		},
		customItemCount: (state, action) => {
			const { recipe_id, itemCount } = action.payload;
			const existingItem = state.cartItems.find((item) => item.recipe_id === recipe_id);
			if (existingItem) {
				existingItem.quantity = itemCount;
				existingItem.totalPrice = existingItem.price * itemCount;
				state.totalBill = state.cartItems.reduce(
					(total, item) => total + item.totalPrice,
					0
				);
			}
		},

		deleteCartItem: (state, action) => {
			const cartItem = state.cartItems.find((item) => item.recipe_id === action.payload);
			if (cartItem) {
				state.totalBill -= cartItem.totalPrice;
				state.cartItems = state.cartItems.filter(
					(item) => item.recipe_id !== action.payload
				);
			}
			state.recipes = state.recipes.map((recipe) =>
				recipe.recipe_id === action.payload ? { ...recipe, isInCart: false } : recipe
			);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchData.pending, (state) => {
				state.isLoading = "loading";
			})
			.addCase(fetchData.fulfilled, (state, action) => {
				state.isLoading = "succeeded";
				state.recipes = action.payload.map((recipe) => ({
					...recipe,
					recipe_id: recipe.id,
					restaurant: getRandomRestaurant(),
					colorScheme: getRandomColor(),
					isFavorite: false,
					isInCart: false,
				}));
				state.error = null;
			})
			.addCase(fetchData.rejected, (state, action) => {
				state.isLoading = "failed";
				state.error = action.error.message;
			});
	},
});

export const getAllRecipes = (state) => state.data.recipes;
export const getRecipeLoading = (state) => state.data.isLoading;

export const getTotalQuantity = (state) =>
	state.data.cartItems?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;

export const allCartItems = (state) => state.data.cartItems;
export const getCartTotal = (state) => state.data.totalBill;
export const getSearchTerm = (state) => state.data.searchTerm;
export const findRecipeById = (state, recipeId) => {
	return state.data.recipes.find((item) => item.recipe_id === recipeId) || null;
};
export const getAllFavorites = (state) =>
	state.data.recipes.filter((recipe) => recipe.isFavorite === true);

export const {
	toggleIsFavorite,
	addedToCart,
	itemIncr,
	itemDecr,
	deleteCartItem,
	setSearchTerm,
	customItemCount,
} = DataSlice.actions;
export default DataSlice.reducer;
