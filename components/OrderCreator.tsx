'use client';
import React from 'react';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function OrderCreator() {
  const [customer, setCustomer] = useState('');
  const [status, setStatus] = useState('pending');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);

  const createOrder = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('orders')
      .insert([{ customer, status, destination }]);
    if (error) {
      console.error('Order insert failed:', error);
    } else {
      alert('Order created!');
      setCustomer('');
      setStatus('pending');
      setDestination('');
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white border rounded shadow-sm mb-6">
      <h2 className="text-lg font-semibold mb-2">Create New Order</h2>
      <div className="flex flex-col space-y-2">
        <input
          className="input"
          placeholder="Customer Name"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />
        <input
          className="input"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <select
          className="input"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="fulfilled">Fulfilled</option>
        </select>
        <button
          className="btn btn-primary"
          onClick={createOrder}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Order'}
        </button>
      </div>
    </div>
  );
}
