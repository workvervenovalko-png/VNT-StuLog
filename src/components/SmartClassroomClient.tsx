"use client";

import { useState } from "react";
import Image from "next/image";

const SmartClassroomClient = ({ initialData }: { initialData: any[] }) => {
  const [selectedClass, setSelectedClass] = useState<any>(null);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
         {/* LIVE FEED MOCK */}
         <div className="flex-[2] bg-black rounded-3xl overflow-hidden relative min-h-[450px] shadow-2xl flex items-center justify-center">
            {selectedClass ? (
               <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <Image src="/noAvatar.png" alt="live" width={100} height={100} className="opacity-20" />
                  <div className="absolute bottom-6 left-6 text-white">
                     <h2 className="text-xl font-bold">{selectedClass.title}</h2>
                     <p className="text-sm text-blue-200">Teacher: {selectedClass.teacher.name} | 🎥 Recording Active</p>
                  </div>
                  <div className="absolute top-6 right-6 flex gap-2">
                     <div className="bg-red-600 px-3 py-1 rounded-md text-[10px] font-bold text-white flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        LIVE
                     </div>
                     <div className="bg-black/50 px-3 py-1 rounded-md text-[10px] font-bold text-white backdrop-blur-md">
                        ACTIVE SESSION
                     </div>
                  </div>
               </>
            ) : (
               <div className="text-center text-gray-500 flex flex-col items-center gap-4">
                  <Image src="/lesson.png" alt="video" width={80} height={80} className="opacity-10" />
                  <p>Select a live session to join the interaction</p>
               </div>
            )}
            
            {/* CONTROLS */}
            <div className="absolute bottom-6 right-6 flex gap-3">
               <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/40 transition">
                  <Image src="/message.png" alt="chat" width={20} height={20} className="invert" />
               </button>
               <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/40 transition">
                  <Image src="/singleBranch.png" alt="hand" width={20} height={20} className="invert" />
               </button>
               <button className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition">
                  <span className="text-white font-bold text-xs">EXIT</span>
               </button>
            </div>
         </div>

         {/* ACTIVE SESSIONS LIST */}
         <div className="flex-1 flex flex-col gap-4">
            <h2 className="font-bold text-plSky uppercase text-xs tracking-widest">Active Sessions</h2>
            {initialData.length > 0 ? (
              initialData.map((cls) => (
                <div 
                   key={cls.id}
                   onClick={() => setSelectedClass(cls)}
                   className={`bg-white p-4 rounded-2xl border-2 cursor-pointer transition ${
                      selectedClass?.id === cls.id ? "border-plSky shadow-lg" : "border-gray-50 hover:border-plSky/20"
                   }`}
                >
                   <div className="flex justify-between items-start">
                      <div className="w-10 h-10 bg-plSkyLight rounded-xl flex items-center justify-center text-plSky font-bold">
                         {cls.title[0]}
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold">{new Date(cls.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                   </div>
                   <h3 className="mt-3 font-bold text-sm">{cls.title}</h3>
                   <p className="text-xs text-gray-500">{cls.teacher.name} {cls.teacher.surname}</p>
                   <div className="mt-4 flex items-center justify-between">
                      <div className="flex -space-x-2">
                         {[1, 2, 3].map(i => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200"></div>
                         ))}
                         <div className="w-6 h-6 rounded-full border-2 border-white bg-plSkyLight text-[8px] flex items-center justify-center text-plSky font-bold">+12</div>
                      </div>
                      <button className="text-[10px] font-bold text-plSky hover:underline">JOIN NOW</button>
                   </div>
                </div>
              ))
            ) : (
              <div className="py-10 flex flex-col items-center justify-center text-gray-400">
                  <p className="text-sm italic">No active smart classes</p>
                  <p className="text-[10px] mt-1">Scheduled virtual classes will appear here</p>
              </div>
            )}
            
            <div className="mt-4 bg-plPurpleLight p-6 rounded-3xl border border-plPurple/20">
               <h3 className="font-bold text-plSky text-sm mb-2">Engagement Analytics</h3>
               <div className="h-2 w-full bg-white rounded-full">
                  <div className="h-full bg-plPurple w-[85%] rounded-full"></div>
               </div>
               <p className="text-[10px] text-gray-500 mt-2">Interaction level monitored via AI</p>
            </div>
         </div>
      </div>
  );
};

export default SmartClassroomClient;
