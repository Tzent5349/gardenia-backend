import { format } from "date-fns";
import { SizeClient } from "./components/client";
import { SizeColumn } from "./components/columns"
import { getAllSize } from "@/lib/database/actions/sizes.action";

const SizesPage = async () => {

    const sizes = await getAllSize();

  const formattedSizes: SizeColumn[] = sizes.map((item:any) => ({
    id: item._id,
    name: item.gender,
/*     value: item., */
    createdAt: format(item.createdAt, 'do MMMM , yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />

      </div>
    </div>
  );
};

export default SizesPage;
