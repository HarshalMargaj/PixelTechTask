"use client";
import React, { useRef, useState } from "react";
import { validateDomain } from "@/lib/resources";
import { FaSpinner } from "react-icons/fa";
import { Button } from "@/app/_components/Button";

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
			setError("");
			setTimeout(() => {
				inputRef.current?.focus();
			}, 0);
		} catch (err) {
			setError("Failed to add domain. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") handleAddDomain();
	};

	return (
		<div className="relative w-full">
			<div className="flex flex-col md:flex-row gap-4">
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
