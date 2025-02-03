import { Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import MyCart from "./pages/MyCart";
import { fetchData } from "./features/DataSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const App = () => {
	const { searchTerm } = useSelector((state) => state.data);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch, searchTerm]);
	return (
		<div className="flex">
			<SideBar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/favorites" element={<FavoritesPage />} />
				<Route path="/cart" element={<MyCart />} />
			</Routes>
		</div>
	);
};

export default App;
