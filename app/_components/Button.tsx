"use client";

interface ButtonProps {
	children: React.ReactNode;
	onClick: () => void;
	color: "red" | "blue" | "green" | "neutral" | "customRed"; // Restrict to valid Tailwind colors
	disabled?: boolean;
}

const colorClasses: Record<string, string> = {
	customRed: "text-white hover:text-red-500",
	red: "bg-red-500 hover:bg-red-600",
	blue: "bg-blue-500 hover:bg-blue-600 text-white",
	green: "bg-green-700 hover:bg-green-800 text-white",
	neutral: "bg-neutral-200 hover:bg-neutral-300 text-neutral-700",
};

export const Button = ({ children, onClick, color, disabled }: ButtonProps) => {
	return (
		<button
			className={`px-4 py-2 text-sm rounded font-medium flex items-center justify-center ${
				colorClasses[color]
			} 
				${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};
