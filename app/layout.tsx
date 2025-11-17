import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crypto Tracker - Real-time Cryptocurrency Prices",
  description:
    "Track the top cryptocurrencies in real-time. Monitor prices, 24h changes, market caps, and trends with our modern crypto dashboard.",
  keywords: [
    "cryptocurrency",
    "bitcoin",
    "ethereum",
    "crypto tracker",
    "market data",
    "blockchain",
    "digital currency",
  ],
  authors: [{ name: "Crypto Tracker" }],
  applicationName: "Crypto Tracker",
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://example.com",
  },
  openGraph: {
    title: "Crypto Tracker - Real-time Cryptocurrency Prices",
    description:
      "Track cryptocurrency prices, market caps, and trends in real-time with our modern crypto dashboard.",
    url: "https://example.com",
    siteName: "Crypto Tracker",
    type: "website",
    images: [
      {
        url: "/pwa-512x512.png",
        width: 512,
        height: 512,
        alt: "Crypto Tracker Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crypto Tracker",
    description:
      "Real-time cryptocurrency market tracking dashboard with charts and prices",
    images: ["/pwa-512x512.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#14b8a6",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
