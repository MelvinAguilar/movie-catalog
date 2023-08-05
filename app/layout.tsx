import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeContextProvider } from "../store/ThemeContext";
import { Providers } from "../store/Provider";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Filmpire",
  description: "A movie catalog website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SkeletonTheme baseColor="#1E2330" highlightColor="#313C4C">
          <Providers>
            <ThemeContextProvider>{children}</ThemeContextProvider>
          </Providers>
        </SkeletonTheme>
      </body>
    </html>
  );
}
