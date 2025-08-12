import { useTranslations } from "next-intl";
import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const t = useTranslations("AppBar");

  return (
    <div className="w-full max-w-3xl mx-4"> {/* تحسينات للريسبونسيف */}
      <div className="relative w-full">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 sm:h-5 sm:w-5" /> {/* أيقونة متجاوبة */}
        <input
          type="search"
          placeholder={t("searchPlaceholder")}
          className="w-full rounded-full border border-border bg-transparent py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:outline-none transition-all text-sm sm:text-base" /* نص متجاوب */
        />
      </div>
    </div>
  );
};

export default SearchBar;