import React from "react";
import { List } from "./List";

interface DomainListProps {
	domains: { name: string; available: boolean }[];
	onRemoveDomain: (domain: string) => void;
}

const DomainList: React.FC<DomainListProps> = ({ domains, onRemoveDomain }) => {
	return (
		<div
			className={`${
				domains.length > 0 &&
				"mt-4 space-y-2 bg-neutral-100/5 p-4 rounded-md"
			}`}
		>
			{domains.length > 0 && (
				<div className="text-neutral-100 font-bold text-2xl">Cart</div>
			)}
			{domains.map(domain => (
				<List
					domain={domain}
					key={domain.name}
					onRemoveDomain={onRemoveDomain}
				/>
			))}
		</div>
	);
};

export default DomainList;
