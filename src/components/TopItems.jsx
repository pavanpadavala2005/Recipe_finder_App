import { useEffect, useState } from "react";
import { setSearchTerm } from "../features/DataSlice";
import { useDispatch } from "react-redux";
import categorizedFoodItems from "../data/recipe_types.json";

const TopItems = () => {
	const [selectedItem, setSelectedItem] = useState(null);
	const [specItem, setSpecialItem] = useState("");
	const [queryingItem, setIsQueryingItem] = useState(
		Object.keys(categorizedFoodItems)[
			Math.floor(Math.random() * Object.keys(categorizedFoodItems).length)
		]
	);

	const dispatch = useDispatch();

	const handleSelectItem = (e, item) => {
		e.preventDefault();
		setSelectedItem(item);
		dispatch(setSearchTerm(item));
	};

	useEffect(() => {
		if (specItem) {
			setIsQueryingItem(specItem);
		}
	}, [specItem]);

	const SpecialItemSelect = () => (
		<select
			name="specialItemSelect"
			id="specialItemSelect"
			value={specItem}
			onChange={(e) => setSpecialItem(e.target.value)}
			className="p-1 md:p-1.5 rounded-md shadow-md outline-none border border-gray-300 bg-white text-gray-700 
             text-sm md:text-base 
             w-full md:w-3/4 lg:w-1/2 
             hover:border-gray-400 focus:border-blue-500 transition-all duration-200 ease-in-out">
			<option value="" disabled>
				Select an option
			</option>
			{Object.keys(categorizedFoodItems).map((category) => (
				<option
					key={category}
					value={category}
					className="p-2 border-b font-semibold text-sm">
					{category}
				</option>
			))}
		</select>
	);

	return (
		<div className="py-6">
			<div className="flex gap-5 my-2 items-center mb-5">
				<h2 className="text-lg md:text-2xl font-bold">Choose Items</h2>
				<div className="flex-shrink w-2/5">
					<SpecialItemSelect />
				</div>
			</div>
			<div className="flex flex-wrap gap-2">
				{(categorizedFoodItems[queryingItem] || []).slice(0, 15).map((item) => (
					<button
						key={item}
						onClick={(e) => handleSelectItem(e, item)}
						className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-colors duration-200 ${
							selectedItem === item
								? "bg-blue-500 text-white"
								: "bg-gray-200 text-gray-700 hover:bg-gray-300"
						}`}>
						{item}
					</button>
				))}
			</div>
		</div>
	);
};

export default TopItems;
