import { getAllOrders } from "@/lib/database/actions/orders.action";
import connectToDatabase from "@/lib/database/connection";

interface GraphData {
  name: string;
  total: number;
}

export const getGraphRevenue = async (): Promise<GraphData[]> => {
  try {
    await connectToDatabase();
    const allOrders = await getAllOrders();

    // Filter paid orders with products
    const paidOrders = allOrders.filter((order: { isPaid: any; product: string | any[]; }) => order.isPaid && order.product && order.product.length > 0);

    const monthlyRevenue: { [key: number]: number } = {};

    // Grouping the orders by month and summing the revenue
    for (const order of paidOrders) {
      const month = new Date(order.createdAt).getMonth(); // 0 for Jan, 1 for Feb, ...
      let revenueForOrder = 0;
      for (const item of order.product) {
        revenueForOrder += item.price;
      }

      // Adding the revenue for this order to the respective month
      monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
    }

    // Initialize graphData array with months
    const graphData: GraphData[] = [
      { name: "Jan", total: 0 },
      { name: "Feb", total: 0 },
      { name: "Mar", total: 0 },
      { name: "Apr", total: 0 },
      { name: "May", total: 0 },
      { name: "Jun", total: 0 },
      { name: "Jul", total: 0 },
      { name: "Aug", total: 0 },
      { name: "Sep", total: 0 },
      { name: "Oct", total: 0 },
      { name: "Nov", total: 0 },
      { name: "Dec", total: 0 },
    ];

    // Filling in the revenue data
    for (const month in monthlyRevenue) {
      if (monthlyRevenue.hasOwnProperty(month) && parseInt(month) >= 0 && parseInt(month) < 12) {
        graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
      }
    }

    return graphData;

  } catch (error) {
    console.error(error);
    return [];
  }
};



//// adfads

/* import { getAllOrders } from "@/lib/database/actions/orders.action";
import connectToDatabase from "@/lib/database/connection";

interface GraphData {
  name: string;
  total: number;
}

const getGraphRevenue = async (interval: string): Promise<GraphData[]> => {
  try {
    await connectToDatabase();
    const allOrders = await getAllOrders();

    // Filter paid orders with products
    const paidOrders = allOrders.filter((order: { isPaid: any; product: string | any[]; }) => order.isPaid && order.product && order.product.length > 0);

    const intervalFormat = (date: Date) => {
      switch (interval) {
        case "day":
          return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        case "week":
          const startOfWeek = new Date(date);
          startOfWeek.setDate(date.getDate() - date.getDay());
          return `${startOfWeek.getDate()}-${startOfWeek.getMonth() + 1}-${startOfWeek.getFullYear()}`;
        case "month":
          return `${date.getMonth() + 1}-${date.getFullYear()}`;
        case "year":
          return `${date.getFullYear()}`;
        default:
          return `${date.getMonth() + 1}-${date.getFullYear()}`;
      }
    };

    const revenueByInterval: { [key: string]: number } = {};

    for (const order of paidOrders) {
      const createdAt = new Date(order.createdAt.$date || order.createdAt);
      const key = intervalFormat(createdAt);

      let revenueForOrder = 0;

      for (const item of order.product) {
        revenueForOrder += item.price;
      }

      revenueByInterval[key] = (revenueByInterval[key] || 0) + revenueForOrder;
    }

    const graphData: GraphData[] = Object.keys(revenueByInterval).map(key => ({
      name: key,
      total: revenueByInterval[key],
    }));

    return graphData;

  } catch (error) {
    console.error(error);
    return [];
  }
};

export { getGraphRevenue };
 */