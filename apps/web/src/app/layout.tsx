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
