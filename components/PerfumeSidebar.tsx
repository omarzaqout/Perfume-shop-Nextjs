import { getCategoryListActions } from "@/actions/category.action";
import ContentSidebar from "./contentSidebar";
import { getBrandListActions } from "@/actions/brand.action";

// const categories = [
//   { title: "عطور رجالية", icon: "Gem", count: 42 },
//   { title: "عطور نسائية", icon: "Flower", count: 38 },
//   { title: "عطور للجنسين", icon: "SprayCan", count: 28 },
//   { title: "عطور عضوية", icon: "Leaf", count: 16 },
//   { title: "عطور فاخرة", icon: "Sparkles", count: 24 },
//   { title: "عطور موسمية", icon: "Gift", count: 19 },
// ];

// const brands = [
//   { title: "شانيل", products: 32 },
//   { title: "ديور", products: 28 },
//   { title: "جيفنشي", products: 24 },
//   { title: "فيرساتشي", products: 19 },
//   { title: "كارتييه", products: 21 },
//   { title: "أرماني", products: 27 },
//   { title: "توم فورد", products: 18 },
//   { title: "كريستيان لوبوتان", products: 15 },
// ];

export default async function PerfumeSidebar() {
  const categories = await getCategoryListActions();
  const brands = await getBrandListActions();
  return <ContentSidebar categories={categories} brands={brands} />;
}
