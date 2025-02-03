import { configureStore } from "@reduxjs/toolkit";
import DataReducer from "../features/DataSlice";
export const store = configureStore({
	reducer: {
		data: DataReducer,
	},
});
