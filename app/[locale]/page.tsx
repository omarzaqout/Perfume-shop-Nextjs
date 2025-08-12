import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import AddProductForm from "@/components/AddProductForm";
import { getCategoryListActions } from "@/actions/category.action";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { createUserAction } from "@/actions/user.action";
import AddBrandForm from "@/components/AddBrandForm";
import SimpleBottomNavigation from "@/components/ButtomBar";
import { Card, CardContent } from "@/components/ui/card";
import { FaStar } from "react-icons/fa"; // لو تقدر تستخدم react-icons

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/ProductCard";
import ProductGrid from "@/components/ProductGrid";
import { getProductListActions } from "@/actions/product.action";
export default async function HomePage() {
  const t = await getTranslations("HomePage");
  const categories = await getCategoryListActions();

  const { userId } = await auth();
  const safeUserId = userId ?? "";

  if (userId) {
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);

    await createUserAction({
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || "",
      name: user.firstName || "New User",
    });
  }

  const products = await getProductListActions();

  return (
    <div>
      <div className="pb-10">
        <div className="sm:p-14 p-7">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full "
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="basis-1/1">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex h-30 sm:h-60 items-center justify-center p-6">
                        <span className="text-3xl font-semibold">
                          {index + 1}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="flex items-center justify-center mb-6 space-x-2 text-primary font-semibold">
          <FaStar />
          <span>منتجات مختارة بعناية</span>
          <FaStar />
        </div>

        <ProductGrid products={products} />

        <AddProductForm categories={categories} userId={safeUserId} />
        <AddBrandForm userId={safeUserId} />
      </div>
      <SimpleBottomNavigation />
    </div>
  );
}
