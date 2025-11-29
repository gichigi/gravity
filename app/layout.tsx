import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TransparentNav from "@/components/transparent-nav";
import { Analytics } from '@vercel/analytics/react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gravity.app'),
  title: "Gravity",
  description: "Gravity is an AI-powered tool that helps bring your startup dreams back down to Earth, faster with natural language prompts.",
  keywords: ["AI parody", "startup rejection", "comedy", "developer tools", "tech humor", "brutal honesty", "Gordon Ramsay"],
  authors: [{ name: "Gravity Team" }],
  creator: "Gravity",
  publisher: "Gravity",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gravity.app",
    title: "Gravity",
    description: "Gravity is an AI-powered tool that helps bring your startup dreams back down to Earth, faster with natural language prompts.",
    siteName: "Gravity",
    images: [
      {
        url: "/og-image.png?v=2",
        width: 1200,
        height: 630,
        alt: "Gravity - Request Denied",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gravity",
    description: "Gravity is an AI-powered tool that helps bring your startup dreams back down to Earth, faster with natural language prompts.",
    images: ["/twitter-image.png?v=2"],
    creator: "@gravity_app",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  colorScheme: "dark light",
  appleWebApp: {
    capable: true,
    title: "Gravity",
    statusBarStyle: "default",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Gravity",
              "description": "Gravity is an AI-powered tool that helps bring your startup dreams back down to Earth, faster with natural language prompts.",
              "url": "https://gravity.app",
              "applicationCategory": "EntertainmentApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Organization",
                "name": "Gravity Team"
              },
              "genre": "Comedy",
              "keywords": "AI parody, startup rejection, comedy, developer tools, tech humor"
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TransparentNav />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
