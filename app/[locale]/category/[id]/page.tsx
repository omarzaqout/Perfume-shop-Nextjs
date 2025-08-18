import { getTranslations } from "next-intl/server";
import { getCategoryByIdAction } from "@/actions/category.action";
import { getProductsByCategoryActions } from "@/actions/product.action";
import ProductGrid from "@/components/ProductGrid";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: { id: string; locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: categoryId, locale } = await params;
  const category = await getCategoryByIdAction(categoryId);

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The category you are looking for does not exist.",
    };
  }

  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: `${category.name} | ${t("storeName")}`,
    description: t("categoryDescription", { categoryName: category.name }),
    openGraph: {
      title: `${category.name} | ${t("storeName")}`,
      description: t("categoryDescription", { categoryName: category.name }),
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: {
    id: string;
    locale: string;
  };
}) {
  const { id: categoryId } = await params;

  const [category, initialProducts] = await Promise.all([
    getCategoryByIdAction(categoryId),
    getProductsByCategoryActions(categoryId, "", 0, 10),
  ]);

  if (!category) {
    notFound();
  }
  const t = await getTranslations("CategoryPage");

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          {category.name}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {t("browsePrompt", { categoryName: category.name })}
        </p>
      </div>

      {initialProducts.length > 0 ? (
        <ProductGrid
          initialProducts={initialProducts}
          categoryId={categoryId}
        />
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">{t("noProducts")}</p>
        </div>
      )}
    </div>
  );
}
