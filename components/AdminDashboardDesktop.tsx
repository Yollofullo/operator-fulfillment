
'use client';

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, User } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const AdminDashboardDesktop = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    { id: 1, status: "Fulfilled", eta: "12:30 PM", destination: "123 Main St", client: "Client A" },
    { id: 2, status: "Active", eta: "12:45 PM", destination: "456 Elm St", client: "Client B" },
    { id: 3, status: "Delayed", eta: "1:00 PM", destination: "789 Oak St", client: "Client C" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Fulfilled":
        return "text-green-600";
      case "Active":
        return "text-blue-600";
      case "Delayed":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-200 p-4 space-y-4">
        <nav className="flex flex-col space-y-2">
          {["Dashboard", "Orders", "Clients", "Reports"].map((item) => (
            <button
              key={item}
              className="flex items-center p-2 rounded hover:bg-blue-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
            >
              <span className="text-sm font-medium aria-label">{item}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center bg-white p-4 rounded shadow">
          <Input placeholder="Search..." className="w-1/3" />
          <div className="flex items-center space-x-4">
            <Bell className="w-5 h-5 text-gray-600" />
            <User className="w-5 h-5 text-gray-600" />
          </div>
        </div>

        {/* Orders Grid */}
        <div className="bg-white p-4 rounded shadow">
          <div className="grid grid-cols-5 font-semibold border-b pb-2 mb-2 text-sm">
            <div>Order ID</div>
            <div>Status</div>
            <div>ETA</div>
            <div>Destination</div>
            <div>Client</div>
          </div>
          {orders.map((order) => (
            <Dialog key={order.id}>
              <DialogTrigger asChild>
                <div
                  onClick={() => setSelectedOrder(order)}
                  className="grid grid-cols-5 py-2 border-b cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-50 text-sm"
                >
                  <div>#{order.id}</div>
                  <div className={getStatusColor(order.status)}>{order.status}</div>
                  <div>{order.eta}</div>
                  <div>{order.destination}</div>
                  <div>{order.client}</div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <h2 className="text-lg font-bold mb-4">Order #{order.id}</h2>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>ETA:</strong> {order.eta}</p>
                <p><strong>Destination:</strong> {order.destination}</p>
                <p><strong>Client:</strong> {order.client}</p>
                <Button className="mt-4 w-full">Edit Order</Button>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardDesktop;
