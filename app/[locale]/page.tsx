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
import HomePageContent from "@/components/HomePageContent";
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
    <><HomePageContent
      products={products}
      categories={categories}
      userId={userId ?? undefined} />
      </>
  );
}