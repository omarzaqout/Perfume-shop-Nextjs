"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { FiShoppingCart, FiUser, FiLogIn, FiMenu, FiX } from "react-icons/fi";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import { ModeToggle } from "./TogleMode";
import { SidebarTrigger } from "./ui/sidebar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { MobileNavItemProps } from "@/interfaces/index";
export default function AppBar() {
  const t = useTranslations("AppBar");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full shadow-md bg-background transition-colors z-50">
      <div className="container mx-auto px-4">
        {/* الصف العلوي */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Perfume Shop Logo"
                width={44}
                height={44}
                className="cursor-pointer dark:invert"
              />
              <span className="hidden sm:block text-lg font-semibold text-foreground">
                {t("storeName")}
              </span>
            </Link>
          </div>

          {/* روابط التنقل على الديسكتوب */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/shop"
              className="text-base text-muted-foreground hover:text-brand transition-colors px-2 py-1"
            >
              {t("shop")}
            </Link>
            <Link
              href="/about"
              className="text-base text-muted-foreground hover:text-brand transition-colors px-2 py-1"
            >
              {t("about")}
            </Link>
          </div>

          {/* عناصر اليمين */}
          <div className="flex items-center gap-4">
            <SignedIn>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-transparent hover:bg-brand hover:text-brand-foreground transition-colors">
                <UserButton />
              </div>
            </SignedIn>
            <SignedOut>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-transparent hover:bg-brand hover:text-brand-foreground transition-colors">
                <SignInButton />
              </div>
            </SignedOut>

            <div className="hidden md:flex items-center gap-5">
              <Link
                href="/cart"
                className="relative text-muted-foreground hover:text-brand transition-colors"
                aria-label={t("cart")}
              >
                <FiShoppingCart size={22} />
                <span className="absolute -top-2 -right-2 bg-brand text-brand-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
              </Link>
              <LocaleSwitcher />
            </div>

            <ModeToggle />

            {/* زر القائمة في الموبايل */}
            <button
              className="md:hidden text-foreground ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
            >
              {isMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
          </div>
        </div>

        {/* القائمة المنسدلة في الموبايل */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t border-border shadow-lg z-40">
            <div className="flex flex-col py-4 px-6 gap-5">
              <MobileNavItem
                href="/shop"
                text={t("shop")}
                onClick={() => setIsMenuOpen(false)}
              />
              <MobileNavItem
                href="/about"
                text={t("about")}
                onClick={() => setIsMenuOpen(false)}
              />

              <div className="flex items-center justify-between pt-2 border-t border-border mt-2">
                <Link
                  href="/cart"
                  className="flex items-center gap-2 text-base text-muted-foreground hover:text-brand transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiShoppingCart size={20} />
                  <span>{t("cart")}</span>
                  <span className="bg-brand text-brand-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    2
                  </span>
                </Link>

                <SignedIn>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-transparent hover:bg-brand hover:text-brand-foreground transition-colors">
                    <UserButton />
                  </div>
                </SignedIn>
                <SignedOut>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-transparent hover:bg-brand hover:text-brand-foreground transition-colors">
                    <SignInButton />
                  </div>
                </SignedOut>
              </div>

              <div className="flex justify-center pt-3 border-t border-border mt-2">
                <LocaleSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function MobileNavItem({ href, text, onClick }: MobileNavItemProps) {
  return (
    <Link
      href={href}
      className="text-lg font-medium text-muted-foreground hover:text-brand transition-colors py-2 px-3 rounded-lg hover:bg-accent"
      onClick={onClick}
    >
      {text}
    </Link>
  );
}
