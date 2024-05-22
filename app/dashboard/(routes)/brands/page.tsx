import { format } from "date-fns";
import { BrandColumn } from "./components/columns"
import { BrandsClient } from "./components/client";
import { getAllBrand } from "@/lib/database/actions/brands.action";

const BrandsPage = async () => {
  const brands = await getAllBrand();

  const formattedBrands: BrandColumn[] = brands.map((item:any) => ({
    id: item._id,
    name: item.name,
    logo:item.logo,
    description: item.description,
    status: item.status,
    createdAt: format(item.createdAt, 'do MMMM, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BrandsClient data={formattedBrands} />
      </div>
    </div>
  );
};

export default BrandsPage;
