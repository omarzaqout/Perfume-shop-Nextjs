import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import AddProductForm from "@/components/AddProductForm";
import { getCategoryListActions } from "@/actions/category.action";

export default async function HomePage() {
  const t = await getTranslations("HomePage");
  const categories = await getCategoryListActions();

  return (
    <div>
      <h1>{t("title")}</h1>
      <Link href="/about">{t("about")}</Link>
      <AddProductForm categories={categories} />
    </div>
  );
}
