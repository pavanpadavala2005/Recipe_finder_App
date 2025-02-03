import { useEffect, useState } from "react";
import { allCartItems, getCartTotal } from "../features/DataSlice";
import { useSelector } from "react-redux";
const QrCodeGenerator = () => {
	let text = "";
	const allItemsInCart = useSelector(allCartItems);
	const totalBill = useSelector(getCartTotal);

	const [isLoading, setIsLoading] = useState(false);
	const [QrCode, setQrCode] = useState("");

	allItemsInCart.map((eachItem) => {
		text +=
			`${eachItem.title.slice(0, 20)}` +
			" - " +
			eachItem.quantity +
			" x " +
			eachItem.price +
			",    ";
	});
	text += `Total Bill - ${totalBill}`;

	const generateQrCode = async () => {
		try {
			setIsLoading(true);
			const { url: QR_CODE } = await fetch(
				`https://quickchart.io/qr?text=${text}&size=200&format=svg`
			);
			setTimeout(() => {
				setQrCode(QR_CODE);
				setIsLoading(false);
			}, 300);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		generateQrCode();
	}, []);

	return (
		<div className="flex flex-col items-center">
			<div className="flex items-center justify-center">
				{isLoading ? (
					<p className="w-full h-full">Loading...</p>
				) : (
					<img src={QrCode} alt="QR Code Error !!" className="w-full h-full" />
				)}
			</div>
			<p>Total Amount : {isLoading ? "Loading..." : `${totalBill}`}</p>

			<p className="mt-4 text-center text-sm text-gray-600">
				Scan QR code to complete payment
			</p>
		</div>
	);
};

export default QrCodeGenerator;
