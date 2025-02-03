import { Link } from "react-router-dom";
import { Heart, Home, ShoppingCart } from "lucide-react";
import { useState } from "react";

const SideBar = () => {
	return (
		<>
			<DesktopSidebar />
			<MobileSidebar />
		</>
	);
};

const DesktopSidebar = () => {
	const [activeLink, setActiveLink] = useState("home");

	const handleClick = (link) => {
		setActiveLink(link);
	};

	return (
		<div className="p-3 md:p-10 border-r min-h-screen w-20 md:w-40 lg:w-64 hidden sm:block">
			<div className="flex flex-col gap-10 sticky top-10 h-full">
				<div className="w-full">
					<img src="/01.png" alt="logo" className="block size-30" />
				</div>
				<ul className="flex flex-col items-center md:items-start gap-8">
					<Link
						to={"/"}
						className={`flex gap-1 ${
							activeLink === "home" ? "font-bold icon-bold" : ""
						}`}
						onClick={() => handleClick("home")}>
						<Home size={"24"} />
						<span className="hidden md:block">Home</span>
					</Link>
					<Link
						to={"/favorites"}
						className={`flex gap-1 ${
							activeLink === "favorites" ? "font-bold icon-bold" : ""
						}`}
						onClick={() => handleClick("favorites")}>
						<Heart size={"24"} />
						<span className="hidden md:block">Favorites</span>
					</Link>
					<Link
						to={"/cart"}
						className={`flex gap-1 ${
							activeLink === "cart" ? "font-bold icon-bold" : ""
						}`}
						onClick={() => handleClick("cart")}>
						<ShoppingCart size={"24"} />
						<span className="hidden md:block">Cart</span>
					</Link>
				</ul>
			</div>
		</div>
	);
};

const MobileSidebar = () => {
	const [activeLink, setActiveLink] = useState("home");

	const handleClick = (link) => {
		setActiveLink(link);
	};

	return (
		<div className="z-50 flex justify-center gap-7 border-t fixed w-full bottom-0 left-0 bg-white p-2 sm:hidden">
			<Link
				to={"/"}
				className={`flex gap-1 ${activeLink === "home" ? "icon-bold" : ""}`}
				onClick={() => handleClick("home")}>
				<Home size={"20"} />
			</Link>
			<Link
				to={"/favorites"}
				className={`flex gap-1 ${activeLink === "favorites" ? "icon-bold" : ""}`}
				onClick={() => handleClick("favorites")}>
				<Heart size={"20"} />
			</Link>
			<Link
				to={"/cart"}
				className={`flex gap-1 ${activeLink === "cart" ? "icon-bold" : ""}`}
				onClick={() => handleClick("cart")}>
				<ShoppingCart size={"20"} />
			</Link>
		</div>
	);
};

export default SideBar;
