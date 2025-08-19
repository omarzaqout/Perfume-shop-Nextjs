import { getTranslations } from "next-intl/server";
import { getBrandByIdAction } from "@/actions/brand.action";
import { getProductsByBrandActions } from "@/actions/product.action";
import ProductGrid from "@/components/ProductGrid";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: { id: string; locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: brandId, locale } = await params;
  const brand = await getBrandByIdAction(brandId);

  if (!brand) {
    return {
      title: "Brand Not Found",
      description: "The brand you are looking for does not exist.",
    };
  }

  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: `${brand.name} | ${t("storeName")}`,
    description: t("brandDescription", { brandName: brand.name }),
    openGraph: {
      title: `${brand.name} | ${t("storeName")}`,
      description: t("brandDescription", { brandName: brand.name }),
    },
  };
}

export default async function BrandPage({
  params,
}: {
  params: {
    id: string;
    locale: string;
  };
}) {
  const { id: brandId } = await params;

  const [brand, initialProducts] = await Promise.all([
    getBrandByIdAction(brandId),
    getProductsByBrandActions(brandId, "", 0, 10),
  ]);

  if (!brand) {
    notFound();
  }

  const t = await getTranslations("BrandPage");

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          {brand.name}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {t("browsePrompt", { brandName: brand.name })}
        </p>
      </div>

      {initialProducts.length > 0 ? (
        <ProductGrid initialProducts={initialProducts} brandId={brandId} />
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">{t("noProducts")}</p>
        </div>
      )}
    </div>
  );
}
