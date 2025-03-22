"use client";
import React, { useRef, useState } from "react";
import { validateDomain } from "@/lib/resources";
import { FaSpinner } from "react-icons/fa"; // ✅ Import spinner icon

interface DomainMultiSelectProps {
	onAddDomain: (domain: string) => void;
	numDomainsRequired: number; // Required number of domains
	totalDomains: number; // Current number of domains in the cart
	domains: { name: string; available: boolean }[];
}

const validExtensions = [".com", ".xyz", ".app"];

const DomainMultiSelect: React.FC<DomainMultiSelectProps> = ({
	onAddDomain,
	numDomainsRequired,
	totalDomains,
	domains,
}) => {
	const [inputValue, setInputValue] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	// ✅ Handle adding domains
	const handleAddDomain = async () => {
		const errorMessage = validateDomain({
			domain: inputValue,
			domains,
			validExtensions,
		});

		if (errorMessage) {
			setError(errorMessage);
			return;
		}

		setLoading(true);
		try {
			await onAddDomain(inputValue);
			setInputValue("");
			setError(""); // Clear errors on success
			setTimeout(() => {
				inputRef.current?.focus();
			}, 0);
		} catch (err) {
			setError("Failed to add domain. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	// ✅ Handle Enter key press
	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") handleAddDomain();
	};

	return (
		<div className="relative w-full">
			{/* ✅ Input Field */}
			<div className="flex items-center gap-4">
				<input
					ref={inputRef}
					type="text"
					placeholder="Enter domain name (e.g., example.com)"
					className={`border-1  p-2 rounded w-full text-neutral-50 ${
						error ? "border-red-500" : "border-neutral-500"
					}`}
					value={inputValue}
					onChange={e => setInputValue(e.target.value)}
					onKeyDown={handleKeyPress}
					disabled={loading}
				/>
				<button
					className="flex justify-center items-center bg-green-700 text-white hover:bg-green-800 px-2 py-2 rounded disabled:opacity-50 cursor-pointer w-[150px] h-10"
					onClick={handleAddDomain}
				>
					{loading ? (
						<FaSpinner className="animate-spin text-white text-lg " />
					) : (
						"Add Domain"
					)}
				</button>
			</div>

			{/* ✅ Error Message */}
			{error && <p className="text-red-500 text-sm my-2">{error}</p>}

			{/* ✅ Add Button */}

			{/* ✅ Cart Status */}
			{domains.length > 0 && (
				<div className="text-sm mb-2 mt-2 text-neutral-700">
					<strong>{totalDomains}</strong> out of{" "}
					<strong>{numDomainsRequired}</strong> domains added.
					{totalDomains > numDomainsRequired && (
						<span className="text-red-500">
							{" "}
							You need to remove some domains.
						</span>
					)}
				</div>
			)}
		</div>
	);
};

export default DomainMultiSelect;
