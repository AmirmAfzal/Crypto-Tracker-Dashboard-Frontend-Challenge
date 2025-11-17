import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
        port: "",
        pathname: "/coins/images/**",
      },
    ],
  },
  turbopack: {},
};

const pwaConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  workboxOptions: {
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/api\.coingecko\.com\/.*/i,
        handler: "NetworkFirst" as const,
        options: {
          cacheName: "coingecko-api",
          networkTimeoutSeconds: 10,
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 5,
          },
        },
      },
      {
        urlPattern: ({ request }) => request.mode === "navigate",
        handler: "NetworkFirst" as const,
        options: {
          cacheName: "pages",
          expiration: { maxEntries: 50 },
        },
      },
      {
        urlPattern: /\.(png|jpg|jpeg|svg|webp|avif|ico)$/i,
        handler: "CacheFirst" as const,
        options: {
          cacheName: "static-images",
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 30 * 24 * 60 * 60,
          },
        },
      },
    ],
    skipWaiting: true,
  },
});

export default pwaConfig(nextConfig);