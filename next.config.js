// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  async redirects() {
      return [
        {
          source: '/',
          destination: '/threes/3dmain',
          permanent: true,
        },
      ]
    },
}

module.exports = nextConfig
