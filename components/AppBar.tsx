'use client';

import Image from "next/image";
import { Link } from "@/i18n/navigation"; // <--- استيراد Link من i18n
import { useState } from 'react';
import { FiShoppingCart, FiUser, FiLogIn, FiMenu, FiX } from 'react-icons/fi';
import { useLocale, useTranslations } from 'next-intl'; // <--- استيراد useTranslations
import LocaleSwitcher from "./LocaleSwitcher";
import { ModeToggle } from "./TogleMode";

export default function AppBar() {
    const t = useTranslations('AppBar'); // <-- استخدام hook الترجمة
    const locale = useLocale();
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // <-- حالة القائمة للشاشات الصغيرة
    const userName = "yazan edali";

    return (
        <header className="relative w-full shadow-md bg-background transition-colors z-50">
            <div className="container mx-auto flex items-center justify-between py-3 px-4">

                {/* --- الجزء الأيسر: الشعار --- */}
                <Link href="/" className="flex items-center gap-2">
                    <Image 
                        src="/logo.png"
                        alt="Perfume Shop Logo"
                        width={50}
                        height={50}
                        className="cursor-pointer dark:invert"
                    />
                    <span className="hidden sm:block text-lg font-semibold text-foreground">
                        {t('storeName')}
                    </span>
                </Link>

                {/* --- الجزء الأوسط: روابط التنقل (للشاشات الكبيرة) --- */}
                <div className="hidden md:flex items-center gap-6">
                    <Link href="/shop" className="text-muted-foreground hover:text-brand transition-colors">
                        {t('shop')}
                    </Link>
                    <Link href="/about" className="text-muted-foreground hover:text-brand transition-colors">
                        {t('about')}
                    </Link>
                </div>

                {/* --- الجزء الأيمن: أزرار التحكم --- */}
                <div className="flex items-center gap-3 sm:gap-4">
                    {/* زر تسجيل الدخول أو الترحيب */}
                    <div className="hidden sm:flex">
                        {isSignedIn ? (
                            <div className="flex items-center gap-2">
                               <FiUser size={18} className="text-foreground"/>
                               <span className="text-sm text-foreground">
                                    {t('welcome', { userName: userName })}
                               </span>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsSignedIn(true)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-transparent hover:bg-brand hover:text-brand-foreground transition-colors"
                            >
                                <FiLogIn/>
                                {t('signIn')}
                            </button>
                        )}
                    </div>

                    {/* أيقونة السلة */}
                    <Link href="/cart" className="relative text-muted-foreground hover:text-brand transition-colors" aria-label={t('cart')}>
                        <FiShoppingCart size={22} />
                        <span className="absolute -top-2 -right-2 bg-brand text-brand-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            2
                        </span>
                    </Link>

                    <ModeToggle />

                    <LocaleSwitcher />

                    <button 
                        className="md:hidden text-foreground" 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
                    >
                        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* --- القائمة المنسدلة (للشاشات الصغيرة) --- */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-background shadow-lg">
                    <div className="flex flex-col items-center gap-4 p-5">
                        <Link href="/shop" className="text-muted-foreground hover:text-brand transition-colors text-lg" onClick={() => setIsMenuOpen(false)}>
                            {t('shop')}
                        </Link>
                        <Link href="/about" className="text-muted-foreground hover:text-brand transition-colors text-lg" onClick={() => setIsMenuOpen(false)}>
                            {t('about')}
                        </Link>
                        <hr className="w-full border-border" />
                        {/* زر تسجيل الدخول للشاشات الصغيرة */}
                        <div className="sm:hidden">
                            {isSignedIn ? (
                                <div className="flex items-center gap-2">
                                   <FiUser size={18} className="text-foreground"/>
                                   <span className="text-sm text-foreground">
                                        {t('welcome', { userName: userName })}
                                   </span>
                                </div>
                            ) : (
                                <button
                                    onClick={() => { setIsSignedIn(true); setIsMenuOpen(false); }}
                                    className="flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-transparent hover:bg-brand hover:text-brand-foreground transition-colors"
                                >
                                    <FiLogIn/>
                                    {t('signIn')}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}