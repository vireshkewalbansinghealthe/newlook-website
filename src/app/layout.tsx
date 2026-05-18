import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "New Look Kapsalon Almere | Premium Kapper",
  description:
    "New Look Kapsalon Almere – Professionele kapper voor knippen, kleuren, haarproteine behandeling en PRP behandeling. Maak online een afspraak.",
  keywords: "kapper almere, kapsalon almere, new look almere, haarproteine, PRP behandeling, haargroei",
  openGraph: {
    title: "New Look Kapsalon Almere",
    description: "Premium kapper in Almere. Online afspraken maken.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
