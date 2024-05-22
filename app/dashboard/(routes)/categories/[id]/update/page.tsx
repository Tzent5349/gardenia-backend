import {CategoryForm} from "@/components/forms/categoryForm";
import { getCategoryById } from "@/lib/database/actions/categories.action";

type UpdateCategoryProps = {
  params: {
    id: string;
  };
};

const UpdateCategory = async ({ params: { id } }: UpdateCategoryProps) => {
  const category = await getCategoryById(id);

  return (
    <>
      <CategoryForm type="Update" category={category} categoryId={category._id} />
    </>
  );
};

export default UpdateCategory;
