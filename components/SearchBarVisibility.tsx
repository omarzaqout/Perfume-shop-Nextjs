"use client";

import { usePathname } from "@/i18n/navigation";
import SearchBar from "./SearchBar";

export default function SearchBarVisibility() {
  const pathname = usePathname();
  
  // إخفاء SearchBar في صفحة Premium
  const isPremiumPage = pathname.includes('/premium');
  
  if (isPremiumPage) {
    return null;
  }
  
  return <SearchBar />;
}