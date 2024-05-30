/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
            port: '',
            pathname: 'sensiblebizpro.appspot.com/**',
          },
        ],
      },
};

export default nextConfig;
