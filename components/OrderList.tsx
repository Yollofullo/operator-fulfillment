'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
    const subscription = supabase
      .from('orders')
      .on('*', () => fetchOrders())
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  const fetchOrders = async () => {
    const { data } = await supabase.from('orders').select('*');
    if (data) setOrders(data);
  };

  return (
    <div>
      <h2 className="font-semibold text-lg mb-2">Orders</h2>
      <ul className="space-y-2">
        {orders.map((order) => (
          <li key={order.id} className="p-3 border rounded bg-white shadow-sm">
            <strong>{order.customer}</strong> - {order.status} -{' '}
            {order.destination}
          </li>
        ))}
      </ul>
    </div>
  );
}
