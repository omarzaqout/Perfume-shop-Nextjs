"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { FiShoppingCart, FiLogIn, FiMenu, FiX } from "react-icons/fi";
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
    <header className="sticky top-0 w-full shadow-md bg-card z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* --- الجزء الأيسر: أيقونة السايدبار والشعار --- */}
                   <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Perfume Shop Logo"
                width={36}
                height={25}
                className="cursor-pointer" // يمكنك إضافة dark:invert هنا إذا كان الشعار يحتاج لذلك
              />
              <span className="hidden sm:block text-lg font-semibold text-foreground">
                {t("storeName")}
              </span>
            </Link>
          </div>

          {/* --- الجزء الأوسط: روابط التنقل للشاشات الكبيرة --- */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/shop"
              className="text-base text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              {t("shop")}
            </Link>
            <Link
              href="/about"
              className="text-base text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              {t("about")}
            </Link>
          </div>

          {/* --- الجزء الأيمن: أزرار التحكم --- */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* أزرار Clerk للتحقق من المستخدم */}
            <div className="hidden sm:flex">
                <SignedOut>
                    <SignInButton mode="modal">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer font-medium">
                            <FiLogIn size={16}/>
                            <span>{t("signIn")}</span>
                        </div>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    {/* UserButton من Clerk يأتي بتصميمه الخاص، من الأفضل تركه بدون تغليف إضافي */}
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>
            </div>


            {/* أيقونة السلة ومبدل اللغة للشاشات الكبيرة */}
            <div className="hidden md:flex items-center gap-5">
              <Link
                href="/cart"
                className="relative text-muted-foreground hover:text-primary transition-colors"
                aria-label={t("cart")}
              >
                <FiShoppingCart size={22} />
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  2
                </span>
              </Link>
              <LocaleSwitcher />
            </div>

            {/* مبدل الثيم */}
            <ModeToggle />

            {/* زر القائمة للشاشات الصغيرة */}
            <button
              className="md:hidden text-foreground ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
            >
              {isMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
          </div>
        </div>

        {/* --- القائمة المنسدلة للشاشات الصغيرة --- */}
        {isMenuOpen && (
          <div className="md:hidden bg-card border-t border-border shadow-lg z-40">
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

              <div className="flex items-center justify-between pt-4 border-t border-border mt-2">
                <Link
                  href="/cart"
                  className="flex items-center gap-3 text-base text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiShoppingCart size={20} />
                  <span>{t("cart")}</span>
                  <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                    2
                  </span>
                </Link>

                {/* أزرار Clerk للشاشات الصغيرة */}
                <div className="sm:hidden">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer font-medium">
                                <FiLogIn size={16}/>
                                <span>{t("signIn")}</span>
                            </div>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                </div>
              </div>
              
              <div className="flex justify-center pt-4 border-t border-border mt-2">
                <LocaleSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// مكون فرعي لعناصر القائمة المنسدلة
function MobileNavItem({ href, text, onClick }: MobileNavItemProps) {
  return (
    <Link
      href={href}
      className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-primary"
      onClick={onClick}
    >
      {text}
    </Link>
  );
}