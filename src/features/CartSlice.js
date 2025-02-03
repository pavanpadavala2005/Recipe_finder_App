import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
	totalPrice: 0,
};
export const CartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const existingItem = state.items.find(
				(item) => item.recipe_id === action.payload.recipe_id
			);
			if (existingItem) {
				existingItem.quantity += action.payload.quantity;
				state.totalPrice += action.payload.price * action.payload.quantity;
			} else {
				state.items.push({ ...action.payload, quantity: 1 });
			}
		},
	},
});

export const { addToCart, removeFromCart } = CartSlice.actions;

export const allCartItems = (state) => state.cart.items;
export default CartSlice.reducer;
