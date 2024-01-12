import { FC } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RootLayoutProps } from "@/interfaces/layouts/RootLayoutProps";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quill",
  description: "Upload PDF and extract unique details with the help of LLMs.",
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
