import "@/styles/globals.css";

import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { cn } from "@/lib/utils";

import { siteConfig } from "@/config/site";

import { getColor } from "@/utils/get-color";

import { Navbar } from "@/components/nav/navbar";

const ThemeProvider = dynamic(
  () => import("@/components/providers/theme-provider"),
  {
    ssr: false,
  }
);

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/favicon.ico",
      href: "/favicon.ico",
    },
  ],
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();
  const data = await getColor(user?.id!);

  return (
    <html lang="en">
      <body
        className={cn(inter.className, data?.color_scheme ?? "theme-orange")}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div>
            <div className="container mx-auto">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
