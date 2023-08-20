import { MonsterProvider } from "@/context/MonsterContext";
import "./globals.css";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",
});

const flatbread = localFont({
  src: "../../public/fonts/FlatBread.ttf",
  variable: "--flatbread",
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
      <MonsterProvider>
        <body
          className={`${inter.variable} ${flatbread.variable} bg-stone-950 font-sans`}
        >
          {children}
        </body>
      </MonsterProvider>
    </html>
  );
}
