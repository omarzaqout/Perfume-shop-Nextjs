"use client";

import { useState, useEffect, useTransition, useRef } from "react";
import { useSearch } from "@/context/SearchContext";
import ProductCard from "@/components/ProductCard";
import { getProductListActions } from "@/actions/product.action";

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
};

export default function ProductGrid() {
  const { searchQuery } = useSearch();

  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const skipRef = useRef(0);
  const take = 10;

  const [hasMore, setHasMore] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    startTransition(() => {
      getProductListActions(searchQuery, 0, take).then((newProducts) => {
        setProducts(newProducts);
        setSkip(newProducts.length);
        skipRef.current = newProducts.length;
        setHasMore(newProducts.length === take);
        setIsLoading(false);
      });
    });
  }, [searchQuery]);

  const loadMore = () => {
    if (!hasMore || isPending) return;

    startTransition(() => {
      getProductListActions(searchQuery, skipRef.current, take).then(
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
  }, [hasMore, isPending, searchQuery]);

  const SkeletonCard = () => (
    <div className="w-full border-2 border-bg-primary rounded-2xl shadow-sm animate-pulse p-3">
      <div className="rounded-2xl w-full h-[150px] sm:h-[200px] md:h-[200px] bg-gray-300" />
      <div className="pt-3 px-3 flex flex-col justify-between space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="h-6 bg-gray-300 rounded w-2/3"></div>
        <div className="h-5 bg-gray-300 rounded w-1/4"></div>
        <div className="h-10 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );

  const Skeleton = ({ count = 10 }) => (
    <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={`skeleton-${index}`} />
      ))}
    </div>
  );

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {hasMore && (
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
