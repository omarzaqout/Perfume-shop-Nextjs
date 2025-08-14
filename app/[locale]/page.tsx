import { getTranslations } from "next-intl/server";
import AddProductForm from "@/components/AddProductForm";
import { getCategoryListActions } from "@/actions/category.action";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { createUserAction, getUserByIdAction } from "@/actions/user.action";
import AddBrandForm from "@/components/AddBrandForm";
import SimpleBottomNavigation from "@/components/ButtomBar";
import { FaStar } from "react-icons/fa";

import ProductGrid from "@/components/ProductGrid";
import SearchBar from "@/components/SearchBar";
import { getBrandListActions } from "@/actions/brand.action";
import AddCategoryForm from "@/components/AddCategoryForm";
import BrandGrid from "@/components/BrandGrid";
import CarouselComponent from "@/components/carocelComponent";
import { getHeroSlidesAction } from "@/actions/hero.action";
export default async function HomePage() {
  const t = await getTranslations("HomePage");
  const categories = await getCategoryListActions();

  const { userId } = await auth();
  const safeUserId = userId ?? "";
  let role = "CLIENT";

  if (userId) {
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);

    await createUserAction({
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || "",
      name: user.firstName || "New User",
    });

    const userInfo = await getUserByIdAction(user.id);
    role = userInfo?.role ?? "CLIENT";
  }

  const brand = await getBrandListActions();
  const heroSlides = await getHeroSlidesAction();

  return (
    <div>
      <div className="pb-10">
        <div className="sm:p-14 p-7">
            <CarouselComponent slides={heroSlides} />
        </div>
       <div className="flex items-center justify-center mb-6 space-x-2 text-primary font-semibold">
         <FaStar />
         <span>{t("featuredProducts")}</span>
         <FaStar />
       </div>

        <ProductGrid />
        <BrandGrid brands={brand} />
        {role === "ADMIN" && <AddCategoryForm />}

        {role === "SELLER" && (
          <>
            <AddProductForm categories={categories} userId={safeUserId} />
            <AddBrandForm userId={safeUserId} />
          </>
        )}
      </div>
      <SimpleBottomNavigation />
    </div>
  );
}
