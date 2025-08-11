"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { FiShoppingCart, FiLogIn, FiSearch } from "react-icons/fi";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import { ModeToggle } from "./TogleMode";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Gem } from "lucide-react";

export default function AppBar() {
  const t = useTranslations("AppBar");

  return (
    <header className="sticky top-0 w-full shadow-md bg-card z-50">
      <div className="container mx-auto px-4">
        <div className="hidden md:flex items-center justify-between py-3 gap-6">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div>
              <Image src="/logo.svg" alt="Logo" width={40} height={35} />
            </div>
            <span className="text-xl font-bold text-foreground">
              {t("storeName")}
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="p-2.5 rounded-full hover:bg-accent transition-colors">
                  <FiLogIn size={20} className="text-muted-foreground" />
                </button>
              </SignInButton>
            </SignedOut>

            <Link
              href="/cart"
              className="relative p-2.5 rounded-full  hover:bg-primary/80 transition-colors"
              aria-label={t("cart")}
            >
              <FiShoppingCart size={20} className="text-muted-foreground" />
              <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                2
              </span>
            </Link>
            <LocaleSwitcher />
            <ModeToggle />
          </div>
        </div>

        {/* ================================================================== */}
        <div className="md:hidden flex items-center justify-between py-2 gap-3">
          <ModeToggle />

          <div className="flex-1 flex items-center gap-3">
            <div>
              <Image src="/logo.svg" alt="Logo" width={40} height={40} />
            </div>
            <span className="text-l font-bold text-foreground">
              {t("storeName")}
            </span>
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
