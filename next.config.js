const withPWA = require("next-pwa");

module.exports = withPWA({
  env: {
    TMDB_API: "cf24a95b77b299531fe34e5d38969d50",
  },
  images: {
    domains: [
      "www.themoviedb.org",
      "res.cloudinary.com",
      "platform-lookaside.fbsbx.com",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "firebasestorage.googleapis.com",
      "links.papareact.com",
      "www.fakestoreapi.com",
      "images.unsplash.com",
    ],
  },
  pwa: {
    dest: "public",
    register: true,
    // skipWaiting: true,
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
});
