"use client";

import { useState } from "react";
import Image from "next/image";

interface TransportItem {
    id: number;
    route: string;
    busNo: string;
    driver: string;
    phone: string;
    status: string;
    capacity: number;
}

const TransportClient = ({ initialData }: { initialData: any[] }) => {
  const [selectedBus, setSelectedBus] = useState<any>(null);

  return (
    <div className="flex flex-col xl:flex-row gap-4">
        {/* BUS LIST */}
        <div className="flex-1 bg-white p-4 rounded-xl shadow-md">
           <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-500">Fleet Status</h2>
              <span className="text-[10px] bg-plSkyLight text-plSky px-2 py-1 rounded-full font-bold">{initialData.length} BUSES</span>
           </div>
           
           <div className="flex flex-col gap-4">
              {initialData.length > 0 ? (
                initialData.map((bus) => (
                  <div 
                    key={bus.id}
                    onClick={() => setSelectedBus(bus)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition ${
                      selectedBus?.id === bus.id ? "border-plSky bg-plSkyLight" : "border-gray-50 hover:border-plSky/20"
                    }`}
                  >
                     <div className="flex justify-between items-center">
                        <h3 className="font-bold">{bus.route}</h3>
                        <span className={`text-[10px] px-2 py-1 rounded-full text-white ${
                          bus.status === 'ON_ROUTE' ? 'bg-green-500' : bus.status === 'DELAYED' ? 'bg-orange-500' : 'bg-gray-400'
                        }`}>
                           {bus.status.replace('_', ' ')}
                        </span>
                     </div>
                     <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>Bus: {bus.busNo}</span>
                        <span>Driver: {bus.driver}</span>
                        <span>Phone: {bus.phone}</span>
                     </div>
                  </div>
                ))
              ) : (
                <div className="py-20 flex flex-col items-center justify-center text-gray-400">
                    <p className="text-sm italic">No transport routes added yet</p>
                    <p className="text-[10px] mt-1">Admin needs to add routes to the database</p>
                </div>
              )}
           </div>
        </div>

        {/* LIVE TRACKING MOCK */}
        <div className="flex-[2] bg-white p-4 rounded-xl shadow-md min-h-[400px] flex flex-col gap-4">
           <div className="flex justify-between items-center">
              <h2 className="font-semibold text-gray-500">Live GPS Tracking</h2>
              {selectedBus && <span className="text-xs text-plSky font-medium">Tracking {selectedBus.busNo}...</span>}
           </div>
           
           <div className="flex-1 bg-gray-100 rounded-xl relative overflow-hidden flex items-center justify-center border">
              <Image src="/noAvatar.png" alt="map" width={100} height={100} className="opacity-10" />
              <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-400 text-sm">{selectedBus ? "Establishing secure GPS link..." : "Select a bus to track live location"}</p>
              </div>
              
              {/* Animated Bus Icon */}
              {selectedBus && (
                <div className="absolute top-1/2 left-1/4 animate-bounce">
                    <div className="w-10 h-10 bg-plSky rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                        <span className="text-white text-[10px] font-bold">BUS</span>
                    </div>
                </div>
              )}
           </div>
           
           <div className="grid grid-cols-3 gap-2">
              <div className="p-3 bg-plSkyLight rounded-xl flex flex-col items-center">
                 <span className="text-lg font-bold text-plSky">{selectedBus ? "42 km/h" : "--"}</span>
                 <span className="text-[10px] text-gray-400 uppercase">Speed</span>
              </div>
              <div className="p-3 bg-plSkyLight rounded-xl flex flex-col items-center">
                 <span className="text-lg font-bold text-plSky">{selectedBus ? "12 mins" : "--"}</span>
                 <span className="text-[10px] text-gray-400 uppercase">ETA</span>
              </div>
              <div className="p-3 bg-plSkyLight rounded-xl flex flex-col items-center">
                 <span className="text-lg font-bold text-plSky">{selectedBus ? "Fuel 78%" : "--"}</span>
                 <span className="text-[10px] text-gray-400 uppercase">Status</span>
              </div>
           </div>
        </div>
      </div>
  );
};

export default TransportClient;
