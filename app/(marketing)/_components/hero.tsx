"use client";

import { Button } from "@/app/_components/Button";
import React from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
	const router = useRouter();

	const redirectShopping = () => {
		router.push("/challenge");
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative">
			{/* Content */}
			<h1 className="text-4xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent mb-4">
				Buy & Secure Your Perfect Domain Name
			</h1>
			<p className="text-md text-neutral-400 max-w-2xl mb-6 font-medium">
				Find, check availability, and purchase the best domain names in
				seconds. With real-time availability checks and an intuitive
				shopping cart, securing your online identity has never been
				easier.
			</p>

			<Button color="green" onClick={redirectShopping}>
				Go to Shopping
			</Button>
		</div>
	);
};

export default Hero;
