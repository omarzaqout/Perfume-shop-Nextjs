import { getCategoryListActions } from "@/actions/category.action";
import ContentSidebar from "./contentSidebar";
import { getBrandListActions } from "@/actions/brand.action";

export default async function PerfumeSidebar() {
  const categories = await getCategoryListActions();
  const brands = await getBrandListActions();
  return <ContentSidebar categories={categories} brands={brands} />;
}
