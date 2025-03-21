"use client";

interface ButtonProps {
	children: React.ReactNode;
	onClick: () => void;
	color: string;
	disabled?: boolean;
}

export const Button = ({ children, onClick, color, disabled }: ButtonProps) => {
	return (
		<button
			className={`px-4 py-2 rounded text-white bg-${color}-500 
    ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-opacity-80"}`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};
