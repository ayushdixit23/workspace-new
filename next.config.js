/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	transpilePackages: ['@mui/x-charts'],
	images: {
		domains: ["minio.grovyo.xyz", "dn3w8358m09e7.cloudfront.net"]
	},
};

module.exports = nextConfig;
