"use client";

import Image from "next/image";

const SettingsPage = () => {
  return (
    <div className="p-4 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-plSky">Settings</h1>
      
      <div className="flex flex-col gap-4">
         {[
            { label: "Notification Preferences", desc: "Manage SMS and Email alerts", icon: "/announcement.png" },
            { label: "Security & Privacy", desc: "Change password and multi-factor auth", icon: "/setting.png" },
            { label: "System Appearance", desc: "Toggle between light and dark modes", icon: "/view.png" },
            { label: "Billing & Subscription", desc: "View plan details and invoices", icon: "/finance.png" },
         ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-plSky/20 cursor-pointer transition-all flex items-center justify-between group shadow-sm hover:shadow-md">
               <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-plSkyLight transition">
                     <Image src={item.icon} alt="icon" width={24} height={24} className="opacity-30 group-hover:opacity-100 transition" />
                  </div>
                  <div>
                     <h3 className="font-bold text-plSky">{item.label}</h3>
                     <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
               </div>
               <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-plSky group-hover:text-white transition">
                  →
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};

export default SettingsPage;
