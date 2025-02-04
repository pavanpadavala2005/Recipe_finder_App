import { Minus, Plus, Trash2 } from "lucide-react";
import { customItemCount, deleteCartItem } from "../features/DataSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const CartItem = ({ cartItem }) => {
	const dispatch = useDispatch();
	const [itemCount, setItemCount] = useState(parseInt(cartItem.quantity));
	useEffect(() => {
		dispatch(customItemCount({ recipe_id: cartItem.recipe_id, itemCount: Number(itemCount) }));
	}, [itemCount]);

	const handleDecrease = (e) => {
		e.preventDefault();
		if (itemCount > 1) {
			setItemCount((prevCount) => prevCount - 1);
		}
	};
	const handleIncrease = (e) => {
		e.preventDefault();
		setItemCount((prevCount) => prevCount + 1);
	};
	const handleDeleteCartItem = () => {
		let isConfirmed = window.confirm(`Do you want to delete ${cartItem.title}`);
		if (isConfirmed) {
			dispatch(deleteCartItem(cartItem.recipe_id));
		}
	};

	return (
		<div
			className={`grid grid-cols-[1.5fr_0.5fr_0.5fr] md:grid-cols-[3fr_1fr_1fr] p-3 rounded-md items-center bg-gray-100 justify-between`}>
			<div className="flex items-center gap-6">
				<img
					src={cartItem?.image_url || ""}
					alt=""
					className="hidden md:block w-16 md:w-20 h-16 md:h-20 rounded-md"
				/>
				<div className="flex flex-col">
					<p className="w-3/4 text-xs md:text-sm font-bold ellipsis-multiline">
						{`${cartItem?.title.slice(0, 21)}...` || "Unknown Recipe"}
					</p>
					<p className="flex flex-col md:flex-row gap-0 md:gap-2">
						<span className="text-[8px] md:text-[12px] tracking-wide font-semibold">
							Price : ₹{cartItem.price}
						</span>
						<span className="text-[8px] md:text-[12px] tracking-wide font-bold">
							Total : ₹{cartItem.price * cartItem.quantity}
						</span>
					</p>
				</div>
			</div>
			<div className="flex-1 flex items-center justify-center gap-1 md:gap-4">
				<Minus
					className="cursor-pointer fill-black size-6 md:size-8"
					onClick={handleDecrease}
				/>
				<input
					type="number"
					className="bg-transparent text-center border font-bold rounded py-2 md:py-1 focus:outline-none w-full text-sm md:w-1/2 md:text-lg shadow-sm"
					value={itemCount}
					onChange={(e) => setItemCount(Number(e.target.value))}
				/>
				<Plus
					className="cursor-pointer fill-black size-6 md:size-8"
					onClick={handleIncrease}
				/>
			</div>
			<div className="flex flex-col items-center p-2 justify-self-end">
				<Trash2
					className="size-4 md:size-6 lg:size-8 cursor-pointer"
					onClick={handleDeleteCartItem}
				/>
			</div>
		</div>
	);
};

export default CartItem;
``;
