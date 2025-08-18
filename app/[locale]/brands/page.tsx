import { getBrands } from "@/actions/brand.action";
import BrandsTable from "@/components/BrandsTable";

export default async function Page() {
  const brands = await getBrands();

  return <BrandsTable brands={brands} />;
}
