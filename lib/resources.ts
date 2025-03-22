// Function to simulate checking domain availability (mock API call)
export const isDomainAvailable = async (domain: string): Promise<boolean> => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(Math.random() > 0.5); // Randomly marks domain as available/unavailable
		}, 500); // Simulates network delay of 500ms
	});
};

// Interface defining the structure of the validation function parameters
interface ValidateDomainProps {
	domain: string;
	domains: { name: string; available: boolean }[]; // List of domains in the cart
	validExtensions: string[]; // Allowed domain extensions (e.g., .com, .net, .org)
}

// Function to validate the entered domain name before adding it
export const validateDomain = ({
	domain,
	domains,
	validExtensions,
}: ValidateDomainProps) => {
	// Convert domain to lowercase and remove any leading/trailing spaces
	domain = domain.toLowerCase().trim();

	// Check if the domain name is empty
	if (!domain) return "Domain name cannot be empty.";

	// Ensure the domain is not already in the cart
	if (domains.some(d => d.name === domain))
		return "This domain is already in the cart.";

	// Validate that the domain has a correct extension
	if (!validExtensions.some(ext => domain.endsWith(ext)))
		return "Invalid domain extension.";

	// Prevent domains from containing 'http' or 'https' (must be a raw domain name)
	if (/https?:\/\//.test(domain))
		return "Domain should not contain http or https.";

	// Ensure the domain does not contain a slash or an incorrect format
	if (domain.includes("/") || domain.split(".").length !== 2)
		return "Invalid domain format.";

	return null; // If all checks pass, return null (meaning no errors)
};
