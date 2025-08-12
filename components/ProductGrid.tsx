// components/ProductGrid.tsx
"use client";

import ProductCard from "@/components/ProductCard";
import { IProduct } from "../interfaces"; // افترضنا أن لديك ملف types.ts مركزي

interface ProductGridProps {
  products: IProduct[];
  className?: string;
}

export default function ProductGrid({ products, className = "" }: ProductGridProps) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 ${className}`}>
      {products.map((product, index) => (
        <ProductCard 
          key={product.id} 
          product={product}
          priority={index < 6} // تحميل أول 6 صور بأولوية
          animationDelay={index * 0.1} // تأثير متتالي للبطاقات
        />
      ))}
    </div>
  );
}