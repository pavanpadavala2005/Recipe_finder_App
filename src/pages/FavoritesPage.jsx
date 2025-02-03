import { useSelector } from "react-redux";
import RecipeCard from "../components/RecipeCard";
import { getAllRecipes } from "../features/DataSlice";

const FavoritesPage = () => {
	const allItems = useSelector((state) => getAllRecipes(state));
	const favoriteItems = allItems.filter((item) => item.isFavorite === true) || [];

	return (
		<div className="bg-[#faf9fb] flex-1 p-10 min-h-screen">
			<div className="max-w-screen-lg mx-auto">
				<p className="font-bold text-2xl md:text-3xl lg:text-5xl mb-10">My favorites</p>

				{favoriteItems.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
						{favoriteItems.map((eachRecipe) => {
							return (
								<RecipeCard
									key={eachRecipe.recipe_id}
									id={eachRecipe.recipe_id}
									recipeDetails={eachRecipe}
								/>
							);
						})}
					</div>
				) : (
					<div className="flex flex-col h-[80vh] items-center gap-4">
						<img src="/404.svg" alt="Favorites not found..." className="h-3/4" />
					</div>
				)}
			</div>
		</div>
	);
};

export default FavoritesPage;
