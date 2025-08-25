"use client";

import { usePathname } from "@/i18n/navigation";
import SearchBar from "./SearchBar";

export default function SearchBarVisibility() {
  const pathname = usePathname();

  const isPremiumPage =
    pathname.includes("/premium") ||
    pathname.includes("/cart") ||
    pathname.includes("/requests");

  if (isPremiumPage) {
    return null;
  }

  return <SearchBar />;
}
