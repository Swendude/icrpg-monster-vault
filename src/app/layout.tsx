import { MonsterProvider } from "@/context/MonsterContext";
import "./globals.css";
import type { Metadata } from "next";

import { Fira_Mono } from "next/font/google";
import localFont from "next/font/local";

const fira = Fira_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  preload: true,
  variable: "--fira",
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
          className={`${fira.variable} ${flatbread.variable} bg-stone-950 font-mono`}
        >
          {children}
        </body>
      </MonsterProvider>
    </html>
  );
}
