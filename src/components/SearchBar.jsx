import { useEffect, useRef, useState } from "react";
import { setSearchTerm } from "../features/DataSlice";
import { Search, X } from "lucide-react";
import { useDispatch } from "react-redux";

const SearchBar = () => {
	const dispatch = useDispatch();
	const [searchItem, setSearchItem] = useState("");
	const inputRef = useRef(null);

	const handleSearch = (e) => {
		e.preventDefault();
		if (searchItem) {
			dispatch(setSearchTerm(searchItem));
			setSearchItem("");
		} else {
			alert("Please enter a recipe name");
		}
	};
	useEffect(() => {
		const focusInput = (e) => {
			if (e.key.toLowerCase() === "f") {
				e.preventDefault();
				inputRef?.current.focus();
			}
		};
		window.addEventListener("keydown", focusInput);
		return () => window.removeEventListener("keydown", focusInput);
	}, []);
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleSearch(e);
			inputRef.current.blur();

		}
	};
	return (
		<form>
			<label className="input shadow-md flex items-center gap-3 md:gap-4 py-6">
				<input
					ref={inputRef}
					type="text"
					className="text-xs md:text-base grow outline-none border-none font-semibold"
					value={searchItem}
					placeholder={`Press "F" to Search something...`}
					onChange={(e) => setSearchItem(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
				<X
					className={`size-4 md:size-5 cursor-pointer ${!searchItem && "hidden"}`}
					onClick={(e) => {
						e.preventDefault();
						if (searchItem) setSearchItem("");
					}}
					onKeyDown={handleKeyDown}
				/>
				<button
					type="submit"
					className="cursor-pointer p-2 bg-gray-300 flex items-center text-xs md:text-base gap-0.5 md:gap-1 rounded-md font-semibold hover:bg-gray-200 -mr-2"
					onClick={handleSearch}
					onKeyDown={handleKeyDown}>
					<Search className="size-4 md:size-6" />
				</button>
			</label>
		</form>
	);
};

export default SearchBar;
