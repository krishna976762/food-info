import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
 import MainHeader from "@/components/header/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "All Meals",
  description: "Browse the delicious meals shared by our vibrant community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
  
      <body className={inter.className}> 
      <MainHeader/>
      {children}</body>
    </html>
  );
}
