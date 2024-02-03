/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        unoptimized : true,
        remotePatterns : [
            {
                protocol : "https",
                hostname : "res.cloudinary.com",
            },
            {
                protocol : "https",
                hostname : "lh3.googleusercontent.com"
            }
        ]
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;
