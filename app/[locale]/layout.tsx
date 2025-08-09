import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";
import { ThemeProvider } from "@/provider/theme-provider";
import { ModeToggle } from "@/components/TogleMode";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ClerkProvider } from "@clerk/nextjs";
import Nav from "@/components/nav";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppBar from "@/components/AppBar";
import PerfumeSidebar from "@/components/PerfumeSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "متجر العطور الفاخرة",
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

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
      className="h-full"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider>
              <SidebarProvider>
                <div className="flex flex-col h-screen w-full">
                  <AppBar />
                  <div className="flex flex-1 overflow-hidden">
                    <Sidebar className="pt-15 hidden md:flex w-64 flex-shrink-0">
                      <PerfumeSidebar />
                    </Sidebar>

                    <main className="flex-1 overflow-y-auto bg-gradient-to-b from-purple-50 to-white p-4 md:p-8">
                      <div className="max-w-7xl mx-auto">{children}</div>
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
