import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { notFound } from "next/navigation";

import { ThemeProvider } from "@/provider/theme-provider";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ClerkProvider } from "@clerk/nextjs";

import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppBar from "@/components/AppBar";
import PerfumeSidebar from "@/components/PerfumeSidebar";
import SearchBar from "@/components/SearchBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Perfume Store",
  description: "اختيارك الأول للعطور الأصلية الفاخرة",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });
  const isRTL = locale === "ar"; // <-- هنا

  return (
    <html
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      suppressHydrationWarning
      className="h-full"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full `}
        suppressHydrationWarning
      >
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider locale={locale} messages={messages}>
              <SidebarProvider>
                <div className="flex flex-col h-screen w-full">
                  <AppBar />
                  <div className="flex flex-1 overflow-hidden">
                    <Sidebar
                      side={isRTL ? "right" : "left"}
                      className="pt-15 hidden md:flex w-64 flex-shrink-0"
                    >
                      <PerfumeSidebar />
                    </Sidebar>

                    <main className=" bg-background flex flex-col  mt-3 w-full p-1 sm:p-5">
                      <div className="flex p-1 sm:p-0">
                        <SidebarTrigger className="p-2 m-2 rounded-lg hover:bg-accent" />
                        <div className="w-full">
                          <SearchBar />
                        </div>
                      </div>

                      <div className="p-5 sm:mt-6 mt-1 w-full h-screen overflow-y-auto scrollbar-hide">
                        {children}
                      </div>
                    </main>
                  </div>
                </div>
              </SidebarProvider>
            </NextIntlClientProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
