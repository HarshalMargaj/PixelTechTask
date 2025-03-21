"use client";

import React from "react";
import { Button } from "@/app/(challenge)/_components/Button";

interface ActionButtonsProps {
	domains: string[];
	onClearCart: () => void;
	numDomainsRequired: number;
	onRemoveUnavailable: () => void;
	onKeepBestDomains: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
	domains,
	onClearCart,
	numDomainsRequired,
	onRemoveUnavailable,
	onKeepBestDomains,
}) => {
	const copyToClipboard = () => {
		navigator.clipboard.writeText(domains.join(", "));
	};

	const isExactCount = domains.length !== numDomainsRequired;

	return (
		<div className="flex space-x-2 mt-4">
			<Button onClick={onClearCart} color="red">
				Clear Cart
			</Button>
			<Button onClick={onRemoveUnavailable} color="orange">
				Remove Unavailable
			</Button>
			<Button onClick={copyToClipboard} color="blue">
				Copy Domains
			</Button>
			<Button onClick={onKeepBestDomains} color="purple">
				Keep Best {numDomainsRequired}
			</Button>
			<Button
				onClick={() => console.log("Purchased:", domains)}
				color="green"
				disabled={isExactCount}
			>
				Purchase Domains
			</Button>
		</div>
	);
};

export default ActionButtons;
