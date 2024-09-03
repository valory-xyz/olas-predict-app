/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    // eslint-disable-next-line no-param-reassign
    config.resolve.fallback = {
      fs: false,
    };
    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'none';",
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },
  redirects() {
    return [
      {
        source: '/',
        destination: '/agents',
        permanent: false,
      },
    ];
  },
};
