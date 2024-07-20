// next.config.js (for Next.js) or webpack.config.js (for vanilla Webpack)
const path = require('path');

// next.config.js

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Add the file-loader rule to handle binary files
      config.module.rules.push({
        test: /\.(png|jpe?g|gif|pdf|node)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '/_next/static/files', // Adjust the public path as needed
              outputPath: 'static/files', // Adjust the output path as needed
            },
          },
        ],
      });
    }

    return config;
  },
};

