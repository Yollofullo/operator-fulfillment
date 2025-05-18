
'use client';

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const ClientDashboard = () => {
  const [clientName, setClientName] = useState("Client");
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({ address: "", time: "", notes: "" });

  useEffect(() => {
    const fetchClient = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (user?.user?.user_metadata?.name) {
        setClientName(user.user.user_metadata.name);
      }
    };

    const fetchOrders = async () => {
      const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (!error) setOrders(data);
    };

    fetchClient();
    fetchOrders();
  }, []);

  const handleReorder = (order) => {
    setFormData({
      address: order.address,
      time: order.time,
      notes: order.notes,
    });
    setFormStep(1);
    setShowForm(true);
  };

  const handleNext = () => setFormStep((prev) => Math.min(prev + 1, 3));

  const handleSubmit = async () => {
    await supabase.from("orders").insert([formData]);
    setShowForm(false);
  };

  return (
    <div className="p-4 bg-white min-h-screen">
      <h1 className="text-2xl font-serif mb-4 text-gray-900">Welcome, {clientName}</h1>

      <div className="flex justify-end mb-4">
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <Button onClick={() => setFormStep(1)}>Create Order</Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-md">
            <div className="text-lg font-semibold mb-2">Step {formStep} of 3</div>
            {formStep === 1 && (
              <Input
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            )}
            {formStep === 2 && (
              <Input
                placeholder="Preferred Time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            )}
            {formStep === 3 && (
              <Input
                placeholder="Notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            )}
            <div className="mt-4 flex justify-end space-x-2">
              {formStep < 3 ? (
                <Button onClick={handleNext}>Next</Button>
              ) : (
                <Button onClick={handleSubmit}>Submit</Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-semibold">{order.address}</div>
                <div className="text-xs text-gray-500">{order.time}</div>
                <div className={`text-xs mt-1 font-medium transition-colors duration-200 ease-in-out ${
                  order.status === 'delivered' ? 'text-green-600' :
                  order.status === 'pending' ? 'text-yellow-600' :
                  order.status === 'canceled' ? 'text-red-600' : ''
                }`}>
                  {order.status}
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleReorder(order)}>Reorder</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientDashboard;
