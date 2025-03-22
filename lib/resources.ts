export const isDomainAvailable = async (domain: string): Promise<boolean> => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(Math.random() > 0.5); // Randomly mark as available/unavailable
		}, 500);
	});
};

interface validateDomainProps {
	domain: string;
	domains: { name: string; available: boolean }[];
	validExtensions: string[];
}

export const validateDomain = ({
	domain,
	domains,
	validExtensions,
}: validateDomainProps) => {
	domain = domain.toLowerCase().trim();

	if (!domain) return "Domain name cannot be empty.";
	if (domains.some(d => d.name === domain))
		return "This domain is already in the cart.";
	if (!validExtensions.some(ext => domain.endsWith(ext)))
		return "Invalid domain extension.";
	if (/https?:\/\//.test(domain))
		return "Domain should not contain http or https.";
	if (domain.includes("/") || domain.split(".").length !== 2)
		return "Invalid domain format.";

	return null; // No errors
};
