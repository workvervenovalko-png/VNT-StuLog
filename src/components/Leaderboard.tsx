"use client";

import Image from "next/image";

const Leaderboard = () => {
  const leaders: any[] = []; // This will eventually be fetched from the database

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
         <h2 className="text-lg font-bold text-plSky">Top Performers</h2>
         <span className="text-[10px] bg-plSkyLight text-plSky px-2 py-1 rounded-full font-bold">ALL CLASSES</span>
      </div>
      <div className="flex flex-col gap-4">
         {leaders.length > 0 ? (
           leaders.map((student) => (
              <div key={student.rank} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100">
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    student.rank === 1 ? 'bg-plPurple text-white' : 
                    student.rank === 2 ? 'bg-gray-200 text-gray-700' : 
                    'bg-plSkyLight text-plSky'
                 }`}>
                    {student.rank}
                 </div>
                 <div className="flex-1">
                    <h3 className="text-sm font-bold">{student.name}</h3>
                    <span className="text-[10px] text-gray-400">Class {student.class}</span>
                 </div>
                 <div className="text-right">
                    <span className="text-sm font-bold text-plSky">{student.score}</span>
                    <div className={`text-[8px] flex items-center justify-end gap-0.5 ${
                       student.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}>
                       {student.trend === 'up' ? '▲' : '▼'} 2.1%
                    </div>
                 </div>
              </div>
           ))
         ) : (
           <div className="flex flex-col items-center justify-center py-10 text-gray-400">
             <Image src="/noData.png" alt="No data" width={60} height={60} className="opacity-20 mb-2" />
             <p className="text-sm italic">No ranking data available yet</p>
             <p className="text-[10px] mt-1 text-center">Add students and exam results to see the leaderboard</p>
           </div>
         )}
      </div>
      {leaders.length > 0 && (
        <button className="w-full mt-6 py-2 text-xs font-bold text-gray-400 hover:text-plSky transition">View Full Rankings</button>
      )}
    </div>
  );
};

export default Leaderboard;
