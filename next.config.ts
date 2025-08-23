/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/My_freelance_website',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Add webpack config for fonts
  /* webpack(config: { module: { rules: { test: RegExp; use: { loader: string; options: { publicPath: string; outputPath: string; name: string; }; }; }[]; }; }) {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/fonts/',
          outputPath: 'static/fonts/',
          name: '[name].[ext]',
        },
      },
    });
    return config;
  } */
}

module.exports = nextConfig