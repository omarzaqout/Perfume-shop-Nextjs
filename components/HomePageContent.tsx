// components/HomePageContent.tsx

"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductGrid from "@/components/ProductGrid";
import AddProductForm from "@/components/AddProductForm";
import AddBrandForm from "@/components/AddBrandForm";
import { ICategory, IProduct } from "@/interfaces";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { motion } from "framer-motion";

// ... (واجهة Props ومكون SectionHeader يبقيان كما هما) ...

interface HomePageContentProps {
  products: IProduct[];
  categories: ICategory[];
  userId?: string;
}

const SectionHeader = ({ title }: { title: string }) => (
  <motion.div 
    className="flex items-center justify-center mb-10 text-center"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 py-2 px-6 bg-accent/20 rounded-full border border-border">
      <FaStar className="text-primary text-xl" />
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      <FaStar className="text-primary text-xl" />
    </div>
  </motion.div>
);


// المكون الرئيسي لمحتوى الصفحة
export default function HomePageContent({ products, categories, userId }: HomePageContentProps) {
  const t = useTranslations("HomePage");
  
  const isAdmin = userId === process.env.NEXT_PUBLIC_ADMIN_USER_ID;

  // --- هذا هو الجزء الذي تم تعديله ---
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2700",
      title: t("heroTitle"),
      subtitle: t("heroSubtitle"),
      buttonText: t("shopNow"),
      href: "/shop",
    },
    {
      image: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/194944s.jpg",
      title: t("heroSlide2.title"),       
      subtitle: t("heroSlide2.subtitle"),  
      buttonText: t("heroSlide2.buttonText"), 
      href: "/collections/summer",
    },
  ];
  // ------------------------------------

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      
      {/* ... (بقية كود return يبقى كما هو) ... */}
      <section className="container mx-auto px-0">
        <Carousel
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-video sm:aspect-[2.4/1] w-full">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    className="object-cover brightness-50"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6 space-y-4 bg-black/20">
                    <motion.h1 
                      className="text-4xl sm:text-6xl font-serif font-bold tracking-tight"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p 
                      className="text-lg sm:text-xl max-w-2xl mx-auto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.4 }}
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.6 }}
                    >
                      <Link href={slide.href} className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold text-lg hover:bg-primary/90 transition-transform hover:scale-105 duration-300">
                        {slide.buttonText}
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 sm:left-8" />
          <CarouselNext className="right-4 sm:right-8" />
        </Carousel>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t("featuredProducts")} />
        <ProductGrid products={products} />
      </section>

      {isAdmin && (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border-2 border-dashed border-primary/50 rounded-lg p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">{t('adminPanelTitle')}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <AddProductForm categories={categories} userId={userId!} />
              <AddBrandForm userId={userId!} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}