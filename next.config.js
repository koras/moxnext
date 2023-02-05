/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  // future: {
  //   webpack5: true,
  // },
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   config.plugins.push(
  //     new CopyPlugin({
  //       patterns: [
  //         {
  //        //   from: path.join(__dirname, "node_modules/tinymce"),
  //        //   to: path.join(__dirname, "public/assets/libs/tinymce"),
  //         },
  //       ],
  //     })
  //   );
  //   return config;
  // },
  // webpackDevMiddleware: (config) => {
  //   return config;
  // },
  webpack: (
    config,
  { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
) => {
  config.plugins = [...config.plugins,
    new webpack.DefinePlugin({
      '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })'
    })
  ]
  // Important: return the modified config
  return config
},
}

module.exports = nextConfig
 