"use client";
import React, { useState, useEffect, useMemo } from "react";
import { isDomainAvailable } from "@/lib/resources";
import DomainMultiSelect from "@/app/challenge/_components/DomainMultiSelect";
import DomainList from "@/app/challenge/_components/DomainList";
import ActionButtons from "@/app/challenge/_components/ActionButtons";

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
		<div className="max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-10">
			<h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-8 bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
				Domain Shopping Cart
			</h1>
			<DomainMultiSelect
				onAddDomain={addDomain}
				numDomainsRequired={numDomainsRequired}
				totalDomains={domains.length}
				domains={domains}
			/>
			<DomainList domains={domains} onRemoveDomain={removeDomain} />
			{domains.length > 0 && (
				<ActionButtons
					domains={domains.map(d => d.name)}
					onClearCart={clearCart}
					numDomainsRequired={numDomainsRequired}
					onRemoveUnavailable={removeUnavailable}
					onKeepBestDomains={keepBestDomains}
				/>
			)}
		</div>
	);
};

export default Challenge;
