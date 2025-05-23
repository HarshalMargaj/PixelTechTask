"use client";
import React from "react";
import { Button } from "@/app/_components/Button";

interface ActionButtonsProps {
	domains: string[];
	onClearCart: () => void;
	numDomainsRequired: number;
	onRemoveUnavailable: () => void;
	onKeepBestDomains: () => void;
}

const ActionButtons = ({
	domains,
	onClearCart,
	numDomainsRequired,
	onRemoveUnavailable,
	onKeepBestDomains,
}: ActionButtonsProps) => {
	const copyToClipboard = () => {
		navigator.clipboard.writeText(domains.join(", "));
	};

	const isExactCount = domains.length !== numDomainsRequired;

	return (
		<div className="grid grid-cols-2 gap-2 sm:flex sm:space-x-2 mt-4 justify-center">
			<Button onClick={onClearCart} color="neutral">
				Clear Cart
			</Button>
			<Button onClick={onRemoveUnavailable} color="neutral">
				Remove Unavailable
			</Button>
			<Button onClick={copyToClipboard} color="neutral">
				Copy Domains
			</Button>
			<Button onClick={onKeepBestDomains} color="neutral">
				Keep Best {numDomainsRequired}
			</Button>
			<Button
				onClick={() => console.log("Purchased:", domains)}
				color="neutral"
				disabled={isExactCount}
			>
				Purchase Domains
			</Button>
		</div>
	);
};

export default ActionButtons;
