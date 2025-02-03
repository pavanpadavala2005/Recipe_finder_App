import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import QrCodeGenerator from "../components/QrCodeGenerator";
import { allCartItems, getCartTotal, getTotalQuantity } from "../features/DataSlice";
import { X } from "lucide-react";

const MyCart = () => {
	const [isQrVisible, setIsQrVisible] = useState(false);

	const cartItems = useSelector(allCartItems);
	const totalBill = useSelector(getCartTotal);
	const totalItemsQuantity = useSelector(getTotalQuantity);

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				setIsQrVisible(false);
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);

	const handleToggleQrVisibility = () => {
		setIsQrVisible(true);
		document.body.style.overflow = "hidden";
	};

	const handleCloseQr = () => {
		setIsQrVisible(false);
		document.body.style.overflow = "auto";
	};

	return (
		<div className="bg-[#faf9fb] flex-1 p-10 min-h-screen relative overflow-hidden">
			<div className="max-w-screen-sm">
				<p className="font-bold text-2xl md:text-3xl lg:text-5xl mb-10">My Cart</p>
				{!cartItems.length ? (
					<div className="flex flex-col h-[20vh] items-center gap-4">
						<h1 className="text-xl">No items found !!</h1>
					</div>
				) : (
					<div className="grid gap-3 grid-cols-1 auto-cols-auto p-1 md:p-5">
						{cartItems.map((item) => (
							<CartItem key={item.recipe_id} cartItem={item} />
						))}
					</div>
				)}
				{cartItems.length > 0 && (
					<>
						<div className="border-t-2 border-black mt-4"></div>
						<div className="flex mt-4 p-4 justify-between mb-40">
							<div className="flex flex-col gap-1">
								<p className="text-xs md:text-xl">
									Total Items : {cartItems.length}
								</p>
								<p className="text-xs md:text-xl">
									Total Quantity : {totalItemsQuantity}
								</p>
								<p className="text-xs md:text-xl">Total Price : {totalBill} </p>
							</div>
							<div>
								<button
									className="btn p-1.5 text-xs md:text-base bg-blue-600 hover:bg-blue-500 text-white font-semibold tracking-wider"
									onClick={handleToggleQrVisibility}>
									Check Out
								</button>
							</div>
						</div>
					</>
				)}
			</div>

			{isQrVisible && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
					<div className="bg-white p-8 rounded-lg shadow-lg relative	">
						<button
							onClick={handleCloseQr}
							className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
							<X size={24} />
						</button>
						<QrCodeGenerator />
					</div>
				</div>
			)}
		</div>
	);
};

export default MyCart;
