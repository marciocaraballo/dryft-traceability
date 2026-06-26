import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const lora      = Lora({ variable: "--font-lora", subsets: ["latin"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "Dryft · Helios Bioscience Inc.",
  description: "409A Valuation — Document Traceability Demo",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html
    lang="en"
    className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} h-full antialiased`}
  >
    <body className="h-full flex flex-col font-sans text-primary">
      {children}
    </body>
  </html>
);

export default RootLayout;
