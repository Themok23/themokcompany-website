import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";
// Canvas loaded via client wrapper
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import { ClientCanvas } from "@/components/clientCanvas";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Mok Company | Management. Innovation. Technology.",
  description:
    "The Mok Company is a 360 degree management, brand, and technology consultancy built for ambitious companies. Strategy, marketing innovation, and technology execution under one roof.",
  keywords: [
    "management consultancy",
    "brand strategy",
    "technology",
    "digital transformation",
    "AI solutions",
    "innovation",
  ],
  openGraph: {
    title: "The Mok Company | We Build What's Next.",
    description:
      "Strategic consultancy. Marketing innovation. Technology execution. All under one roof.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col grain-overlay">
        <ClientCanvas />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
