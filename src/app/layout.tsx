import { FC } from "react";
import { Metadata } from "next";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/shared/Navbar";
import Providers from "@/components/providers/Providers";
import { RootLayoutProps } from "@/interfaces/layouts/RootLayoutProps";

import "react-loading-skeleton/dist/skeleton.css";
import "../styles/globals.css";

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
