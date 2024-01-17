import { type FC } from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/shared/Navbar";
import { type RootLayoutProps } from "@/interfaces/layouts/RootLayoutProps";

import "../styles/globals.css";
import Providers from "@/components/providers/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Quill",
  description: "Upload PDF and extract unique details with the help of LLMs.",
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <Providers>
        <body
          className={cn("grainy min-h-screen antialiased", poppins.className)}
        >
          <Navbar />
          {children}
        </body>
      </Providers>
    </html>
  );
};

export default RootLayout;
