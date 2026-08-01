import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SeasonalThemeProvider } from "@/hooks/useSeasonalTheme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bio-portfolio-seven.vercel.app"),
  title: "Ritesh Dey | Creative Developer & Artist",
  description: "Welcome to my digital garden. A blend of creative coding, photography, web apps, and interactive experiences built with modern tech.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Ritesh Dey | Creative Developer & Artist",
    description: "Welcome to my digital garden. A blend of creative coding, photography, web apps, and interactive experiences built with modern tech.",
    url: "https://bio-portfolio-seven.vercel.app",
    siteName: "Ritesh Dey Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ritesh Dey Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ritesh Dey | Creative Developer & Artist",
    description: "Welcome to my digital garden. A blend of creative coding, photography, web apps, and interactive experiences built with modern tech.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground theme-transition`}
      >
        <SeasonalThemeProvider>
          <Navbar />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
        </SeasonalThemeProvider>
      </body>
    </html>
  );
}
