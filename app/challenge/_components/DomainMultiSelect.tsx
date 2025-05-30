"use client";
import React, { useRef, useState } from "react";
import { validateDomain } from "@/lib/resources";
import { FaSpinner } from "react-icons/fa";
import { Button } from "@/app/_components/Button";
import { IoClose } from "react-icons/io5";

interface DomainMultiSelectProps {
	onAddDomain: (domain: string) => void;
	numDomainsRequired: number;
	totalDomains: number;
	domains: { name: string; available: boolean }[];
}

const validExtensions = [".com", ".xyz", ".app"];

const DomainMultiSelect = ({
	onAddDomain,
	numDomainsRequired,
	totalDomains,
	domains,
}: DomainMultiSelectProps) => {
	const [inputValue, setInputValue] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	// Function to handle adding a new domain
	const handleAddDomain = async () => {
		// Validate the domain before proceeding
		const errorMessage = validateDomain({
			domain: inputValue, // User-inputted domain name
			domains, // Existing domains list
			validExtensions, // Allowed domain extensions (e.g., .com, .xyz, .app)
		});

		// If validation fails, set error message and exit function
		if (errorMessage) {
			setError(errorMessage);
			return;
		}

		setLoading(true); // Show loading state while checking domain availability
		try {
			// Attempt to add the domain
			await onAddDomain(inputValue);

			// Reset input field and error state after successful addition
			setInputValue("");
			setError("");

			// Refocus the input field after adding a domain
			setTimeout(() => {
				inputRef.current?.focus();
			}, 0);
		} catch (err) {
			// Handle errors if domain addition fails
			console.error(err);
			setError("Failed to add domain. Please try again.");
		} finally {
			setLoading(false); // Stop loading state
		}
	};

	// Function to handle pressing "Enter" to add a domain
	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") handleAddDomain();
	};

	return (
		<div className="relative w-full">
			<div className="flex flex-col md:flex-row gap-4">
				{/* <div className="w-full">
					<input
						ref={inputRef}
						type="text"
						placeholder="Enter domain name (e.g., example.com)"
						className={`border p-2 rounded w-full text-neutral-50 ${
							error ? "border-red-500" : "border-neutral-500"
						}`}
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
						onKeyDown={handleKeyPress}
						disabled={loading}
					/>
					<IoClose />
				</div> */}
				<div
					className={`w-full flex items-center border p-2 rounded ${
						error
							? "border-red-500"
							: "border-neutral-500 focus-within:border-blue-500"
					} `}
				>
					<input
						ref={inputRef}
						type="text"
						placeholder="Enter domain name (e.g., example.com)"
						className="w-full text-neutral-50 outline-none bg-transparent"
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
						onKeyDown={handleKeyPress}
						disabled={loading}
					/>
					{inputValue.length > 0 && (
						<IoClose
							className="cursor-pointer text-neutral-50"
							onClick={() => setInputValue("")}
						/>
					)}
				</div>
				<Button onClick={handleAddDomain} color="green">
					{loading ? (
						<FaSpinner className="animate-spin text-white text-lg" />
					) : (
						"Add"
					)}
				</Button>
			</div>

			{error && <p className="text-red-500 text-sm my-2">{error}</p>}

			{domains.length > 0 && (
				<div className="text-sm mt-2 text-neutral-700">
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
