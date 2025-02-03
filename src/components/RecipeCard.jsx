import { DollarSign, Heart, MapPin, ShoppingCart, SoupIcon, Store } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addedToCart, toggleIsFavorite } from "../features/DataSlice";

const RecipeCard = ({ recipeDetails }) => {
	const isLoading = useSelector((state) => state.data.isAddToCartLoading);
	const {
		image_url,
		isFavorite,
		isInCart,
		publisher,
		publisher_url,
		recipe_id,
		restaurant,
		colorScheme,
		social_rank,
		source_url,
		title,
	} = recipeDetails;
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const toggleIsFavoriteRecipe = () => {
		dispatch(toggleIsFavorite(recipe_id));
	};
	const addRecipeToCart = () => {
		dispatch(addedToCart({ recipe_id, price: restaurant.price }));
	};

	return (
		<div
			className={`flex flex-col rounded-md ${colorScheme.bg} overflow-hidden p-5 relative shadow-lg`}>
			<a href="#" className="relative">
				<img
					src={image_url}
					alt="Recipe_Image_Error"
					className="rounded-md w-full h-60 object-cover cursor-pointer"
					onClick={(e) => e.preventDefault()}
				/>
				<div className="absolute bottom-2 left-2 bg-white rounded-full px-2 py-1 cursor-pointer flex items-center gap-2 hover:bg-gray-100">
					<SoupIcon size={"24"} />
					<span className="text-sm">{restaurant.servings}</span>
				</div>
				<div className="absolute right-2 top-2 bg-white rounded-full p-1 cursor-pointer hover:scale-105 transition-all duration-150">
					{!isFavorite && (
						<Heart
							size={"24"}
							className="active:fill-red-500 active:text-red-500 overflow-hidden hover:scale-110 transition-all duration-150"
							onClick={(e) => {
								e.preventDefault();
								toggleIsFavoriteRecipe();
							}}
						/>
					)}
					{isFavorite && (
						<Heart
							size={"24"}
							className="fill-red-500 text-red-500 overflow-hidden hover:scale-110 transition-all duration-150"
							onClick={(e) => {
								e.preventDefault();
								toggleIsFavoriteRecipe();
							}}
						/>
					)}
				</div>
			</a>
			<div className="flex mt-1 flex-col">
				<p className="w-3/4 font-bold tracking-wide truncate">{title}</p>
			</div>
			<div className="mt-1 flex items-center gap-4">
				<p className="text-base flex items-center gap-1.5">
					<Store size={"18"} />
					{publisher}
				</p>
				<span className="flex items-center gap-1 text-sm">
					<MapPin size={"14"} />
					{restaurant.location}
				</span>
			</div>

			<div className="flex gap-6 mt-3 justify-between items-center">
				<div className="text-xl md:text-2xl font-bold pl-4 tracking-wide">
					₹{restaurant.price}
				</div>

				<div
					className={`flex gap-2 cursor-pointer items-center shadow-md ${
						colorScheme.badge
					}  rounded-md  px-2 py-3 hover:scale-105 ${isInCart && "hidden"}`}
					onClick={(e) => {
						e.preventDefault();
						addRecipeToCart();
					}}>
					<ShoppingCart size={"20"} />

					<span className="text-sm tracking-tighter font-semibold lg:text-base">
						Add to Cart
					</span>
				</div>
				{isLoading ? (
					"Loading..."
				) : (
					<div
						className={`flex gap-2 cursor-pointer items-center shadow-md ${
							colorScheme.badge
						}  rounded-md  px-2 py-3 hover:scale-105 ${!isInCart && "hidden"}`}
						onClick={(e) => {
							e.preventDefault();
							navigate("/cart");
						}}>
						<DollarSign size={"20"} />
						<span className="text-sm tracking-tighter font-semibold lg:text-base">
							Go To Cart
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default RecipeCard;
