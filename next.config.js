/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
};

module.exports = {
	reactStrictMode: true,
	images: {
		domains: ["upload.wikimedia.org"],
	},
};
