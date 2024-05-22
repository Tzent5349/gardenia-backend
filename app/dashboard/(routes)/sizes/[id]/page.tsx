import SizeForm from "@/components/forms/SizeForm";
import { getSizeById } from "@/lib/database/actions/sizes.action";

type UpdateSizeProps = {
  params: {
    id: string;
  };
};

const UpdateSize = async ({ params: { id } }: UpdateSizeProps) => {
  const size = await getSizeById(id);

  return (
    <>
      <SizeForm type="Update" size={size} sizeId={size._id} />
    </>
  );
};

export default UpdateSize;
