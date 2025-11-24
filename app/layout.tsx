import type { Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SideNav } from "@/components/SideNav";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RATIO",
  description: "Scholarly OS for the modern scholar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${cormorantGaramond.variable} ${ibmPlexMono.variable} font-mono antialiased`}
      >
        <div className="flex h-screen overflow-hidden">
          <SideNav />
          <div className="flex-1 flex ml-64 min-w-0">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
