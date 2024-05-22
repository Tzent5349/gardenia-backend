import { format } from "date-fns";
import { ColorClient } from "./components/client";
import { ColorColumn } from "./components/columns"
import { getAllColor } from '@/lib/database/actions/colors.action'

const ColorsPage = async () => {

    const colors = await getAllColor();

  const formattedColors: ColorColumn[] = colors.map((item:any) => ({
    id: item._id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'do MMMM , yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColors} />

      </div>
    </div>
  );
};

export default ColorsPage;
