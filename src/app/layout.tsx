import type { Metadata } from "next";
import { IBM_Plex_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paidhu Group | Building Businesses That Inspire a Better Future",
  description: "Paidhu Group is a diversified Fortune-class organization building ethical foods, premium technology, consumer brands, and transformative education. A legacy of purpose-driven enterprise.",
  keywords: ["Paidhu Group", "Ethical Businesses", "Floffi", "Viyara IT", "Kalika Sphere", "Paidhu Ethical Foods", "Corporate Group India"],
  authors: [{ name: "Paidhu Group" }],
  openGraph: {
    title: "Paidhu Group | Building Businesses That Inspire a Better Future",
    description: "A diversified group shaping the future through ethical innovation and purposeful enterprise.",
    type: "website",
    url: "https://www.paidhu.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paidhu Group",
    description: "Building Businesses That Inspire a Better Future",
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
      className={`${ibmPlexSans.variable} ${playfairDisplay.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
