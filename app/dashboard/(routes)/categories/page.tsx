import { format } from "date-fns";
import { getAllCategory } from "@/lib/database/actions/categories.action";
import { CategoryColumn } from "./components/columns"
import { CategoriesClient } from "./components/client";

const CategoriesPage = async () => {
  const categories = await getAllCategory();

  const formattedCategories: CategoryColumn[] = categories.map((item:any) => ({
    id: item._id,
    name: item.name,
    image:item.img,
    parent: item.parent,
    children: item.children,
    productType: item.productType,
    description: item.description,
    status: item.status,
    createdAt: format(item.createdAt, 'do MMMM, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
