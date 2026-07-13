/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/services', destination: '/expertises', permanent: true },
      { source: '/projets', destination: '/references', permanent: true },
      { source: '/histoires', destination: '/journal', permanent: true },
      { source: '/mission', destination: '/missions', permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
