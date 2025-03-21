import React from "react";

interface DomainListProps {
	domains: { name: string; available: boolean }[];
	onRemoveDomain: (domain: string) => void;
}

const DomainList: React.FC<DomainListProps> = ({ domains, onRemoveDomain }) => {
	return (
		<div className="mt-4 space-y-2">
			{domains.map(domain => (
				<div
					key={domain.name}
					className="flex justify-between items-center p-2 border rounded"
				>
					<span>
						{domain.name} (
						{domain.available ? "Available" : "Unavailable"})
					</span>
					<button
						className="bg-red-500 text-white px-2 py-1 rounded"
						onClick={() => onRemoveDomain(domain.name)}
					>
						Remove
					</button>
				</div>
			))}
		</div>
	);
};

export default DomainList;
