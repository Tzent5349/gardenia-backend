import { getAllOrders } from "@/lib/database/actions/orders.action";
import connectToDatabase from "@/lib/database/connection";

export const getSalesCount = async()=>{
    try {
        await connectToDatabase();
        const allOrders = await getAllOrders()
        return allOrders.length

    } catch (error) {
        console.log(error);
    }
}