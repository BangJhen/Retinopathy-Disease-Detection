/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure webpack to handle ONNX Runtime Web properly
  webpack: (config, { isServer }) => {
    // Fallback for Node.js modules in browser
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        buffer: false,
        util: false,
        os: false,
      };
    }

    // Handle WASM files
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
    });

    // Ignore problematic modules
    config.externals = config.externals || [];
    if (!isServer) {
      config.externals.push({
        'onnxruntime-node': 'commonjs onnxruntime-node',
      });
    }

    return config;
  },

  // Experimental features
  experimental: {
    esmExternals: 'loose',
  },

  // Headers for CORS if needed
  async headers() {
    return [
      {
        source: '/retinal_classifier_efficientnet_b1.onnx',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
