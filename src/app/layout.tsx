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

const flatbread = localFont({
  src: "../../public/fonts/FlatBread.ttf",
  variable: "--flatbread",
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
    <html lang="en">
      <body
        className={`${hand.variable} ${inter.variable} ${flatbread.variable} bg-stone-950 font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
