/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "steamcommunity-a.akamaihd.net",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
