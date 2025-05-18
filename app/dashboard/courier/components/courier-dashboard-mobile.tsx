
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function CourierDashboardMobile() {
  const [order, setOrder] = useState(null);

  
  const [onlineSince] = useState(Date.now());
  const [onlineTime, setOnlineTime] = useState("00:00");
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [riderCoords, setRiderCoords] = useState(null);
  const [routePath, setRoutePath] = useState([]);
  const [upcomingOrders, setUpcomingOrders] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - onlineSince) / 1000);
      const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const secs = String(elapsed % 60).padStart(2, '0');
      setOnlineTime(`${mins}:${secs}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [onlineSince]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const { data } = await supabase.from('orders').select('*').neq('status', 'delivered').order('created_at', { ascending: true }).limit(3);
      setUpcomingOrders(data || []);
    };

    fetchUpcoming();
  }, []);


  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await supabase.from('orders').select('*').eq('status', 'active').single();
      setOrder(data);
    };

    fetchOrder();
  }, []);

  return (
    <div className="bg-[#1a1a1a] min-h-screen text-white p-4 space-y-4">
      {/* Status Bar */}
      <div className="flex justify-between items-center">
        <span className="text-green-400 font-mono text-sm">{`ONLINE: ${onlineTime}`}</span>
        <Button className="bg-red-600 text-white rounded-full px-4 py-2 text-sm">
          GO OFFLINE
        </Button>
      </div>

      {/* Active Order Card */}
      {order && (
        <Card className="bg-black rounded-xl animate-[pulse_3s_ease-in-out_infinite]">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">ETA: {order.eta}</div>
            <div className="text-gray-400 mt-1">{order.destination}</div>
          </CardContent>
        </Card>
      )}

      {/* Map View */}
      <div className="rounded-xl overflow-hidden h-64 relative">
        <MapContainer
          center={destinationCoords || [0, 0]}
          zoom={13}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={riderCoords || [0, 0]} />
          <Polyline positions={routePath} color="lime" />
        </MapContainer>
        <div className="absolute bottom-2 right-2 space-y-1">
          <Button className="bg-white/20 text-white px-2 py-1 text-xs rounded hover:bg-white/30 active:bg-white/40 focus:outline-none focus:ring-2 focus:ring-white" aria-label="Zoom control" aria-label="Map zoom control">+</Button>
          <Button className="bg-white/20 text-white px-2 py-1 text-xs rounded hover:bg-white/30 active:bg-white/40 focus:outline-none focus:ring-2 focus:ring-white" aria-label="Zoom control" aria-label="Map zoom control">-</Button>
        </div>
      </div>

      {/* Upcoming Orders */}
      <div className="space-y-2">
        <div className="text-lg font-semibold">Upcoming Orders</div>
        {upcomingOrders.map((order, index) => (
          <Card key={index} className="bg-[#2a2a2a] rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500">
            <CardContent className="p-3 flex justify-between items-center">
              <div>
                <div className="text-white text-sm">Pickup: 01:15 PM</div>
                <div className="text-gray-400 text-xs">Client Name → 456 Elm St</div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-green-500 text-xs px-2 py-1 rounded-full">On Time</span>
                <span className="text-white text-xl">→</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
