"use client";
import { useState, useEffect, useTransition, useRef } from "react";
import { useSearch } from "@/context/SearchContext";
import ProductCard from "@/components/ProductCard";
import {
  getProductListActions,
  getProductsByCategoryActions,
  getProductsByBrandActions, // ✅ استدعاء الدالة الجديدة
} from "@/actions/product.action";
import { ProductGridSkeleton } from "./Skeleton";

type Product = {
  brand: { name: string };
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  brandId: string;
  category?: { name: string };
};

type ProductGridProps = {
  initialProducts: Product[];
  loadMoreAction?: (skip: number, take: number) => Promise<Product[]>;
  hasMore?: boolean;
  categoryId?: string;
  brandId?: string; // ✅ أضفنا brandId
  searchQuery?: string;
};

export default function ProductGrid({
  initialProducts = [],
  loadMoreAction,
  hasMore: initialHasMore = true,
  categoryId,
  brandId, // ✅ استقباله كمُدخل
  searchQuery = "",
}: ProductGridProps) {
  const { searchQuery: contextSearchQuery } = useSearch();
  const effectiveSearchQuery = searchQuery || contextSearchQuery;

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [skip, setSkip] = useState(initialProducts.length);
  const skipRef = useRef(initialProducts.length);
  const take = 10;

  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(!initialProducts.length);

  const fetchProducts = (search: string, skip: number, take: number) => {
    if (categoryId) {
      return getProductsByCategoryActions(categoryId, search, skip, take);
    }
    if (brandId) {
      return getProductsByBrandActions(brandId, search, skip, take); // ✅ شرط جديد
    }
    return getProductListActions(search, skip, take);
  };

  useEffect(() => {
    setIsLoading(true);
    startTransition(() => {
      fetchProducts(effectiveSearchQuery, 0, take).then((newProducts) => {
        setProducts(newProducts);
        setSkip(newProducts.length);
        skipRef.current = newProducts.length;
        setHasMore(newProducts.length === take);
        setIsLoading(false);
      });
    });
  }, [effectiveSearchQuery, categoryId, brandId]); // ✅ أضفنا brandId هنا

  const loadMore = () => {
    if (!hasMore || isPending) return;

    startTransition(() => {
      fetchProducts(effectiveSearchQuery, skipRef.current, take).then(
        (newProducts) => {
          setProducts((prev) => [...prev, ...newProducts]);
          const newSkip = skipRef.current + newProducts.length;
          setSkip(newSkip);
          skipRef.current = newSkip;
          setHasMore(newProducts.length === take);
        }
      );
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isPending, effectiveSearchQuery]);

  return (
    <>
      {isLoading ? (
        <ProductGridSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {hasMore && products.length >= 10 && (
            <button
              disabled={isPending}
              onClick={loadMore}
              className="mt-4 p-2 bg-primary text-white rounded hover:bg-primary-hover"
            >
              {isPending ? "تحميل..." : "تحميل المزيد"}
            </button>
          )}
        </>
      )}
    </>
  );
}
