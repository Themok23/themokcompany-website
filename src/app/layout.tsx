import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ClientCanvas } from "@/components/clientCanvas";
import { PageTransition } from "@/components/pageTransition";
import SmoothScroll from "@/components/smoothScroll";

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
  title: "The Mok Company | We Build What's Next.",
  description:
    "Strategic consultancy. Marketing innovation. Technology execution. All under one roof.",
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
        <SmoothScroll>
          <ClientCanvas />
          <Navbar />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
