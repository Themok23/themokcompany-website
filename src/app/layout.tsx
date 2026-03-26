import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col grain-overlay">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
