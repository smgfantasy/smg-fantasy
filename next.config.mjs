/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/team',
                permanent: true, // Use true for 308 redirects or false for 307 redirects
            },
        ];
    },
};

export default nextConfig;
