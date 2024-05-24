module.exports = {
  images: {
    domains: ["res.cloudinary.com", "i.ibb.co"]
  },
  async headers() {
    return [
      {
        source: '/(.*)', // Allow all routes
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Allow requests from any origin
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS', // Allow specified HTTP methods
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: '*', // Allow all headers
          },
        ],
      },
    ];
  },
};
