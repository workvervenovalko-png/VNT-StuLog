"use client";

import { useState } from "react";
import Image from "next/image";

const AttendanceScanPage = () => {
  const [scannedStudent, setScannedStudent] = useState<any>(null);
  const [status, setStatus] = useState<"idle" | "scanning" | "success" | "error">("idle");

  const simulateScan = () => {
    setStatus("scanning");
    setTimeout(() => {
      // Mock result
      const mockStudent = {
        name: "Aman Sharma",
        id: "STU1001",
        class: "10-A",
        time: new Intl.DateTimeFormat("en-IN", { timeStyle: "short" }).format(new Date()),
      };
      setScannedStudent(mockStudent);
      setStatus("success");
      
      // Auto-reset after 3 seconds
      setTimeout(() => {
        setStatus("idle");
        setScannedStudent(null);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="p-4 flex flex-col items-center gap-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-plSky">Smart Attendance Scanner</h1>
        <p className="text-sm text-gray-500">Scan Student RFID Card or Face for real-time attendance</p>
      </div>

      {/* Scanner Visual */}
      <div className={`w-64 h-64 border-4 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all ${
        status === "scanning" ? "border-plPurple animate-pulse" : 
        status === "success" ? "border-green-500 bg-green-50" : 
        "border-plSky/20"
      }`}>
        {status === "success" ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-3xl font-bold">✓</span>
            </div>
            <span className="text-green-600 font-bold">Attendance Recorded</span>
          </div>
        ) : (
          <>
            <Image src="/sort.png" alt="scan" width={80} height={80} className="opacity-20" />
            <button 
              onClick={simulateScan}
              disabled={status === "scanning"}
              className="bg-plSky text-white px-4 py-2 rounded-xl text-sm font-bold"
            >
              {status === "scanning" ? "Detecting..." : "Scan Card"}
            </button>
          </>
        )}
      </div>

      {/* Scanned Info */}
      {scannedStudent && (
        <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm flex gap-4 animate-slide-up border border-green-100">
           <div className="w-16 h-16 bg-plSkyLight rounded-full flex items-center justify-center text-plSky font-bold">
              AS
           </div>
           <div className="flex flex-col">
              <h2 className="text-lg font-bold">{scannedStudent.name}</h2>
              <span className="text-xs text-gray-400">ID: {scannedStudent.id} | Class: {scannedStudent.class}</span>
              <span className="text-xs text-green-600 mt-1 font-medium">Recorded at {scannedStudent.time}</span>
           </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
         <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col items-center">
            <span className="text-2xl font-bold text-plSky">452</span>
            <span className="text-[10px] text-gray-400">PRESENT TODAY</span>
         </div>
         <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col items-center">
            <span className="text-2xl font-bold text-red-500">24</span>
            <span className="text-[10px] text-gray-400">ABSENT TODAY</span>
         </div>
      </div>
    </div>
  );
};

export default AttendanceScanPage;
