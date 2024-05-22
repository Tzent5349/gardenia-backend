import ColorForm from "@/components/forms/colorForm";
import { getColorById } from "@/lib/database/actions/colors.action";

type UpdateColorProps = {
  params: {
    id: string;
  };
};

const UpdateColor = async ({ params: { id } }: UpdateColorProps) => {
  const color = await getColorById(id);

  return (
    <>
      <ColorForm type="Update" color={color} colorId={color._id} />
    </>
  );
};

export default UpdateColor;
