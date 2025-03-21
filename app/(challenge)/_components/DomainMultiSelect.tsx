"use client";
import React, { useState } from "react";
import { validateDomain } from "@/lib/resources";

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

	// ✅ Handle adding domains
	const handleAddDomain = async () => {
		const errorMessage = validateDomain({
			domain: inputValue,
			domains,
			totalDomains,
			numDomainsRequired,
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
			<input
				type="text"
				placeholder="Enter domain name (e.g., example.com)"
				className={`border p-2 rounded w-full mb-2 ${
					error ? "border-red-500" : ""
				}`}
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				onKeyDown={handleKeyPress}
				disabled={loading}
			/>

			{/* ✅ Error Message */}
			{error && <p className="text-red-500 text-sm mb-2">{error}</p>}

			{/* ✅ Add Button */}
			<button
				className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
				onClick={handleAddDomain}
			>
				{loading ? <span>Adding domain...</span> : "Add Domain"}
			</button>

			{/* ✅ Cart Status */}
			<div className="text-sm mb-2 mt-2">
				<strong>{totalDomains}</strong> out of{" "}
				<strong>{numDomainsRequired}</strong> domains added.
				{totalDomains > numDomainsRequired && (
					<span className="text-red-500">
						{" "}
						You need to remove some domains.
					</span>
				)}
			</div>
		</div>
	);
};

export default DomainMultiSelect;
