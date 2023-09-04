import { MonsterProvider } from "@/context/MonsterContext";
import "./globals.css";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Patrick_Hand } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",
});

const hand = Patrick_Hand({
  weight: ["400"],
  variable: "--hand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ICRPG Monster Vault",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${hand.variable} ${inter.variable} bg-stone-950 font-hand`}
      >
        {children}
      </body>
    </html>
  );
}
