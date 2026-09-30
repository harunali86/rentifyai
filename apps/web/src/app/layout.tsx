import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rentifyai.vercel.app"),
  title: "RentifyAI | India's Premium Real Estate Platform",
  description: "Find, buy, or rent luxury properties across Pune & Mumbai with 100% Zero Brokerage, RERA-verified titles, and AI Zestimate® valuation.",
  icons: {
    icon: [
      { url: "/favicon.ico?v=4", sizes: "any" },
      { url: "/favicon.svg?v=4", type: "image/svg+xml" },
    ],
    apple: "/favicon.png?v=4",
  },
  openGraph: {
    title: "RentifyAI | India's Premium Real Estate Platform",
    description: "100% Zero Brokerage • Direct Owner WhatsApp • MahaRERA Verified Luxury Residences & Penthouses.",
    url: "https://rentifyai.vercel.app",
    siteName: "RentifyAI",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RentifyAI - India's Premium Real Estate Platform",
        type: "image/jpeg",
      },
      {
        url: "/og-square.jpg",
        width: 600,
        height: 600,
        alt: "RentifyAI Logo",
        type: "image/jpeg",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RentifyAI | India's Premium Real Estate Platform",
    description: "100% Zero Brokerage • Direct Owner WhatsApp • Luxury Real Estate.",
    images: ["/og-image.jpg"],
  },
};

import { AuthProvider } from "@/context/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { Toaster } from "sonner";
import { AiAdvisorDrawer } from "@/components/ai/AiAdvisorDrawer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico?v=4" sizes="any" />
        <link rel="icon" href="/favicon.svg?v=4" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.png?v=4" />
        <meta property="og:image" content="https://rentifyai.vercel.app/og-image.jpg" />
        <meta property="og:image:secure_url" content="https://rentifyai.vercel.app/og-image.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://rentifyai.vercel.app/og-image.jpg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <AuthModal />
          <AiAdvisorDrawer />
          <Toaster position="top-center" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
