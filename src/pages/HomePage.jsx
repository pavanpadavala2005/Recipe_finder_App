import RecipeCard from "../components/RecipeCard";
import { useSelector } from "react-redux";
import { getAllRecipes, getRecipeLoading } from "../features/DataSlice";
import TopItems from "../components/TopItems";
import { useEffect, useRef, useState, useMemo } from "react";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
	const allRecipes = useSelector(getAllRecipes);
	const isRecipesLoading = useSelector(getRecipeLoading);

	const recipeContainerRef = useRef(null);
	const [topHeight, setTopHeight] = useState(0);

	const updateTopHeight = () => {
		if (recipeContainerRef.current) {
			setTopHeight(recipeContainerRef.current.getBoundingClientRect().top);
		}
	};

	useEffect(() => {
		const handleScroll = () => {
			clearTimeout(window.scrollTimeout);
			window.scrollTimeout = setTimeout(updateTopHeight, 100);
		};

		updateTopHeight();
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const recipeList = useMemo(() => {
		if (isRecipesLoading === "loading") {
			return [...Array(9)].map((_, index) => (
				<div className="flex w-full flex-col gap-4" key={index}>
					<div className="skeleton h-64 w-full relative">
						<div className="skeleton h-10 w-28 absolute bottom-2 left-2 bg-gray-100"></div>
						<div className="skeleton h-10 w-10 absolute rounded-full right-4 top-4 bg-gray-100"></div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="skeleton h-4 w-40"></div>
						<div className="skeleton h-4 w-40"></div>
					</div>
					<div className="flex justify-end">
						<div className="skeleton h-10 w-40"></div>
					</div>
				</div>
			));
		}
		return allRecipes.map((eachRecipe) => (
			<RecipeCard
				key={eachRecipe.recipe_id}
				id={eachRecipe.recipe_id}
				recipeDetails={eachRecipe}
			/>
		));
	}, [allRecipes, isRecipesLoading]);

	return (
		<div className="bg-[#faf9fb] p-5 flex-1">
			<div className="max-w-screen-lg mx-auto">
				{topHeight < 0 && (
					<div className="fixed z-50 w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto flex items-center justify-center pointer-events-none">
						<p className="bg-gray-300 px-2 py-1 text-black bg-opacity-70 text-xs md:text-sm rounded-md font-semibold tracking-wider ">
							1/{allRecipes.length}
						</p>
					</div>
				)}
				<div className="flex flex-col gap-5">
					<p className="font-bold text-3xl md:text-5xl">Welcome...</p>
					<SearchBar />
				</div>
				<TopItems />
				<div
					ref={recipeContainerRef}
					className="grid gap-3 grid-cols-1 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
					{recipeList}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
