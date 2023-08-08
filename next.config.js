// @ts-check
const { withContentlayer } = require('next-contentlayer')

// /** @type {import('next').NextConfig} */  
// const withAntdLess = require('next-plugin-antd-less');  
module.exports = withContentlayer({
 
  experimental: {
    appDir: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['pbs.twimg.com', 'avatars.githubusercontent.com', 'i.imgur.com'],
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        { key: 'Cross-Origin-Embedder-Policy', value: 'same-origin' },
      ],
    },
  ],
 

  // webpack: (
  //   config,
  //   { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  // ) => {
  //   config.module.rules.push(
  //     {
  //       test: /\.md$/,
  //       use: 'raw-loader'
  //     }
  //   )
  //   // Important: return the modified config
  //   return config
  // },

})

