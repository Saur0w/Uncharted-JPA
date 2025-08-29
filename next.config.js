/** @type {import('next').NextConfig} */
const nextConfig = {
  
  experimental: {

  },

  async headers() {
    return [
      {
        source: '/api/content/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate, proxy-revalidate'
          },
          {
            key: 'Pragma',
            value: 'no-cache'
          },
          {
            key: 'Expires',
            value: '0'
          },
          {
            key: 'Surrogate-Control',
            value: 'no-store'
          }
        ]
      },
      {
        source: '/blog',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate'
          },
          {
            key: 'X-Robots-Tag',
            value: 'noarchive'
          }
        ]
      }
    ];
  },

  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  trailingSlash: false,
  

}

module.exports = nextConfig