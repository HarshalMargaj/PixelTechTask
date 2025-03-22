"use client";

import { BiTrash } from "react-icons/bi";
import { Button } from "./Button";

interface ListProps {
	domain: { name: string; available: boolean };
	onRemoveDomain: (name: string) => void;
}

export const List = ({ domain, onRemoveDomain }: ListProps) => {
	return (
		<div className="flex justify-between items-center p-2 rounded bg-white/10">
			<span className="text-neutral-50">
				{domain.name}
				<span className="text-neutral-300 text-xs">
					{" "}
					({domain.available ? "Available" : "Unavailable"})
				</span>
			</span>
			<Button
				// className=" text-white px-2 py-1 rounded cursor-pointer hover:bg-red-100"
				color="customRed"
				onClick={() => onRemoveDomain(domain.name)}
			>
				<BiTrash size={20} />
			</Button>
		</div>
	);
};
