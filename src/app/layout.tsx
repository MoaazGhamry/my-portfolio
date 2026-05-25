import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Providers from "@/components/Providers";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Moaaz Mohamed Elghamry | Mechatronics Engineer & AIoT Architect",
  description:
    "Architecting distributed automation ecosystems and bridging the gap between heavy industry and AIoT. Founder at Cortex Company, Manager at PowerGroup. CSWP Certified, 3.99 CGPA.",
  keywords: [
    "Mechatronics Engineer",
    "AIoT",
    "Cortex Company",
    "PowerGroup",
    "Industrial Automation",
    "Django Developer",
    "SOLIDWORKS CSWP",
    "PLC Programming",
    "Siemens TIA Portal",
    "Full-Stack Developer",
  ],
  authors: [{ name: "Moaaz Mohamed Elghamry" }],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
  },
  openGraph: {
    title: "Moaaz Mohamed Elghamry | Mechatronics Engineer & AIoT Architect",
    description:
      "Founder at Cortex Company. Architecting distributed automation ecosystems bridging heavy industry and AIoT.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moaaz Mohamed Elghamry | Portfolio",
    description:
      "Mechatronics Engineer, AIoT Architect, Founder at Cortex Company.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MME Portfolio",
  },
};

export const viewport: Viewport = {
  themeColor: "#8b5cf6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
        style={{ fontFamily: "var(--font-space-grotesk), system-ui, sans-serif" }}
      >
        <Providers>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
