import type { Metadata } from "next";
import { Playfair_Display, Inter, Manrope } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paidhu Group | Ethical Businesses, Sustainable Future",
  description: "Paidhu Group is a diversified organization shaping the future through ethical foods, innovative technology, premium consumer brands, and transformative education. Building sustainable businesses for a better tomorrow.",
  keywords: ["Paidhu Group", "Ethical Foods", "Sustainability", "Viyara", "Floffi", "Kalika Sphere", "Corporate Group"],
  authors: [{ name: "Paidhu Group" }],
  openGraph: {
    title: "Paidhu Group | Ethical Businesses, Sustainable Future",
    description: "Paidhu Group is a diversified organization shaping the future through ethical foods, innovative technology, premium consumer brands, and transformative education.",
    type: "website",
    url: "https://www.paidhugroup.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${manrope.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased text-[#1A1A1A] bg-[#F8F6F2] transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
