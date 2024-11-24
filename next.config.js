/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  reactStrictMode: true,
  env: {
    YOUTUBE_API_KEY:"AIzaSyDiTGqma51NNnoBecHIPqyNawUJ4QmwK6g",
    RAPIDAPI_KEY:"c9c159f72dmsh4fda92fd6d00dfdp134fbdjsn2998ab971e14"
  },
  images: {
    domains: ['lh3.googleusercontent.com',"res.cloudinary.com","api-ninjas.com","img.youtube.com"]
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  },

}

module.exports = nextConfig
