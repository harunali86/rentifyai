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
  title: "RentifyAI | India's Premium Real Estate Platform",
  description: "Find, buy, or rent luxury properties across India's most elite neighborhoods. India's #1 destination for premium real estate.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "RentifyAI",
    description: "Premium Real Estate Platform for India's high-end market.",
    url: "https://rentify.ai",
    siteName: "RentifyAI",
    locale: "en_IN",
    type: "website",
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
        <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
        <link rel="icon" href="/favicon.svg?v=3" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.png?v=3" />
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
