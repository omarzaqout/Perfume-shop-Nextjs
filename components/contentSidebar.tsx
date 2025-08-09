"use client";
import React, { useState } from "react";
import { Link } from "@/i18n/navigation";
import {
  Home,
  ShoppingBag,
  Tag,
  ShoppingCart,
  User,
  Search,
  ChevronDown,
  ChevronUp,
  Star,
  Gift,
  Heart,
  Gem,
  SprayCan,
  Flower,
  Leaf,
  Sparkles,
} from "lucide-react";
import { IBrand, ICategory } from "@/interfaces";

const ContentSidebar = ({
  categories,
  brands,
}: {
  categories: ICategory[];
  brands: { name: string; id: string }[];
}) => {
  const [openCategories, setOpenCategories] = useState(true);
  const [openBrands, setOpenBrands] = useState(true);

  const mainItems = [
    { title: "الرئيسية", url: "/", icon: Home, color: "text-amber-500" },
    { title: "السلة", url: "/cart", icon: ShoppingCart, color: "text-sky-400" },
    { title: "حسابي", url: "/account", icon: User, color: "text-violet-400" },
    { title: "بحث", url: "/search", icon: Search, color: "text-amber-300" },
  ];

  const collections = [
    {
      title: "المفضلة",
      url: "/favorites",
      icon: Heart,
      color: "text-rose-500",
    },
    {
      title: "أفضل المبيعات",
      url: "/bestsellers",
      icon: Star,
      color: "text-amber-400",
    },
    { title: "هدايا", url: "/gifts", icon: Gift, color: "text-emerald-500" },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-b from-purple-900 to-purple-800 text-white flex flex-col shadow-2xl">
      <div className="p-6 pb-4 border-b border-purple-700">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-amber-400 to-amber-600 w-14 h-14 rounded-full flex items-center justify-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-amber-300 font-serif tracking-wide">
          متجر العطور الفاخرة
        </h1>
        <p className="text-xs text-center text-purple-200 mt-1">
          اختيارات مميزة لعطور لا تُنسى
        </p>
      </div>

      <div className="flex-1 overflow-y-auto py-5 px-3">
        <div className="space-y-1 mb-6">
          {mainItems.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-purple-700 hover:shadow-lg hover:translate-x-1 group"
            >
              <div
                className={`${item.color} group-hover:text-amber-300 transition-colors`}
              >
                <item.icon size={20} />
              </div>
              <span className="text-base group-hover:text-amber-300 transition-colors">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
        <div className="mb-6">
          <div
            className="flex items-center justify-between p-4 cursor-pointer rounded-xl hover:bg-purple-700 transition-colors"
            onClick={() => setOpenCategories(!openCategories)}
          >
            <h3 className="text-base font-semibold text-amber-300 flex items-center gap-2">
              <ShoppingBag size={18} />
              التصنيفات
            </h3>
            {openCategories ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </div>

          {openCategories && (
            <div className="mt-2 space-y-2 pl-6">
              {categories.map((category, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-purple-700/50 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-purple-300 group-hover:text-amber-300 transition-colors"></div>
                      <span className="text-sm group-hover:text-amber-300 transition-colors">
                        {category.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mb-6">
          <div
            className="flex items-center justify-between p-4 cursor-pointer rounded-xl hover:bg-purple-700 transition-colors"
            onClick={() => setOpenBrands(!openBrands)}
          >
            <h3 className="text-base font-semibold text-amber-300 flex items-center gap-2">
              <Star size={18} />
              العلامات التجارية
            </h3>
            {openBrands ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>

          {openBrands && (
            <div className="mt-2 space-y-2 pl-6">
              {brands.map((brand, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-purple-700/50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm group-hover:text-amber-300 transition-colors">
                      {brand.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-purple-300 mb-3 px-3">
            المجموعات المميزة
          </h3>
          {collections.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-purple-700 hover:shadow-lg hover:translate-x-1 group"
            >
              <div
                className={`${item.color} group-hover:text-amber-300 transition-colors`}
              >
                <item.icon size={20} />
              </div>
              <span className="text-base group-hover:text-amber-300 transition-colors">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-purple-700">
        <div className="flex items-center justify-center">
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-purple-400"></div>
            ))}
          </div>
        </div>
        <p className="text-xs text-center text-purple-300 mt-2">
          © 2023 جميع الحقوق محفوظة.
        </p>
      </div>
    </div>
  );
};

export default ContentSidebar;
