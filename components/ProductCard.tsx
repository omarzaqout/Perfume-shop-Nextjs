// components/ProductCard.tsx
"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { IProduct } from "@/interfaces";
import { cn } from "@/lib/utils"; 

interface ProductCardProps {
  product: IProduct;
  priority?: boolean;
  animationDelay?: number;
}

export default function ProductCard({ 
  product, 
  priority = false,
  animationDelay = 0
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-md"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden aspect-square bg-gray-100 dark:bg-gray-800">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            priority={priority}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        </div>
      </Link>
      
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {product.brand.name}
        </h3>
        
        <h2 className="mt-1 text-sm font-semibold text-foreground line-clamp-2 h-8">
          <Link href={`/product/${product.id}`} className="hover:text-primary">
            {product.name}
          </Link>
        </h2>
        
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2 h-8">
          {product.description}
        </p>

        <div className="mt-auto flex items-end justify-between pt-3">
          <p className="text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
          
          {/* --- هذا هو السطر الذي تم تعديله ليصبح ذكياً --- */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Add to cart"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-300",
              // المنطق الجديد: ظاهر دائماً على الجوال، ويظهر عند الحومان على الديسكتوب
              "opacity-100 md:opacity-0 md:group-hover:opacity-100"
            )}
          >
            <FaShoppingCart size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}