import { getAllOrders } from '@/lib/database/actions/orders.action'
import { format } from 'date-fns'
import React from 'react'
import { OrderClient } from '../orders/components/client'

const OrdersPage = async() => {
    const allOrders = await getAllOrders()
    const formattedOrders = allOrders.map((order:any)=>({
      id: order._id,
      userId: order.userId,
      product: order.product,
      paid: order.isPaid,
      createdAt: format(order.createdAt, 'do MMMM , yyyy'),
    }))
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />

      </div>
    </div>
  )
}

export default OrdersPage