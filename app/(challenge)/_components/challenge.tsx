"use client";
import { isDomainAvailable } from "@/lib/resources";
import React, { useState, useEffect, useMemo } from "react";
import DomainMultiSelect from "./DomainMultiSelect";
import DomainList from "./DomainList";
import ActionButtons from "./ActionButtons";

interface Domain {
	name: string;
	available: boolean;
}

const Challenge: React.FC = () => {
	const [domains, setDomains] = useState<Domain[]>([]);
	const [numDomainsRequired, setNumDomainsRequired] = useState(3);

	useEffect(() => {
		console.log("Domains updated", domains);
	}, [domains]);

	const sortedDomains = useMemo(() => {
		return [...domains].sort((a, b) => {
			const priority = [".com", ".app", ".xyz"];
			const extA = priority.indexOf(
				a.name.slice(a.name.lastIndexOf("."))
			);
			const extB = priority.indexOf(
				b.name.slice(b.name.lastIndexOf("."))
			);
			if (extA !== extB) return extA - extB;
			return a.name.length - b.name.length;
		});
	}, [domains]);

	const addDomain = async (domain: string) => {
		if (!domains.some(d => d.name === domain)) {
			const available = await isDomainAvailable(domain);
			setDomains([...domains, { name: domain, available }]);
		}
	};

	const removeDomain = (domain: string) => {
		setDomains(domains.filter(d => d.name !== domain));
	};

	const clearCart = () => {
		setDomains([]);
	};

	const removeUnavailable = () => {
		setDomains(domains.filter(d => d.available));
	};

	const keepBestDomains = () => {
		setDomains(sortedDomains.slice(0, numDomainsRequired));
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Domain Shopping Cart</h1>
			<DomainMultiSelect
				onAddDomain={addDomain}
				numDomainsRequired={numDomainsRequired}
				totalDomains={domains.length}
				domains={domains}
			/>
			<DomainList domains={domains} onRemoveDomain={removeDomain} />
			<ActionButtons
				domains={domains.map(d => d.name)}
				onClearCart={clearCart}
				numDomainsRequired={numDomainsRequired}
				onRemoveUnavailable={removeUnavailable}
				onKeepBestDomains={keepBestDomains}
			/>
		</div>
	);
};

export default Challenge;
