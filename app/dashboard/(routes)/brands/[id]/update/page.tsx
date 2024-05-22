import {BrandForm} from "@/components/forms/BrandForm";
import { getBrandById } from "@/lib/database/actions/brands.action";

type UpdateBrandProps = {
  params: {
    id: string;
  };
};

const UpdateBrand = async ({ params: { id } }: UpdateBrandProps) => {
  const brand = await getBrandById(id);

  return (
    <>
      <BrandForm type="Update" brand={brand} brandId={brand._id} />
    </>
  );
};

export default UpdateBrand;
