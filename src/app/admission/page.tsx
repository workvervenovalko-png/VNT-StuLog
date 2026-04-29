"use client";

import { useState } from "react";
import Image from "next/image";

export default function AdmissionPortal() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-plSky/10">
        {/* Header */}
        <div className="bg-plSky p-8 text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Online Admission Portal</h1>
            <p className="text-blue-200 text-sm">VNT EduCore Academic Session 2024-25</p>
          </div>
          <div className="text-4xl font-bold opacity-20">STEP {step}/3</div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-100 w-full">
          <div className="h-full bg-plPurple transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>

        <form className="p-8 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          {step === 1 && (
            <div className="flex flex-col gap-4 animate-fade-in">
              <h2 className="font-bold text-plSky border-b pb-2">Student Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">First Name</label>
                  <input type="text" className="p-3 border rounded-xl outline-none focus:border-plSky" placeholder="John" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Last Name</label>
                  <input type="text" className="p-3 border rounded-xl outline-none focus:border-plSky" placeholder="Doe" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Date of Birth</label>
                  <input type="date" className="p-3 border rounded-xl outline-none focus:border-plSky" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Gender</label>
                  <select className="p-3 border rounded-xl outline-none focus:border-plSky">
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4 animate-fade-in">
              <h2 className="font-bold text-plSky border-b pb-2">Medical & Document Info</h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Medical Conditions / Allergies</label>
                  <textarea className="p-3 border rounded-xl outline-none focus:border-plSky" placeholder="Any chronic illness or allergies..."></textarea>
                </div>
                <div className="border-2 border-dashed border-gray-200 p-6 rounded-xl flex flex-col items-center gap-2">
                   <Image src="/upload.png" alt="upload" width={32} height={32} className="opacity-40" />
                   <span className="text-sm text-gray-400">Upload Aadhar Card / Birth Certificate (PDF/JPG)</span>
                   <button className="bg-gray-100 text-xs px-4 py-2 rounded-lg font-bold">Choose File</button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center gap-6 py-8 animate-fade-in text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                 <span className="text-4xl">✅</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">Review & Submit</h2>
                <p className="text-sm text-gray-500 mt-2">By submitting, you agree to the school&apos;s terms and conditions.</p>
              </div>
              <div className="bg-plSkyLight p-4 rounded-xl w-full text-left">
                  <p className="text-xs text-plSky">Application Fee: ₹1,500</p>
                  <p className="text-[10px] text-gray-400">Payable after verification</p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} className="px-6 py-3 text-gray-400 font-bold hover:text-plSky transition">Back</button>
            )}
            <div className="flex-1"></div>
            {step < 3 ? (
              <button onClick={() => setStep(step + 1)} className="bg-plSky text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-900 transition">Continue</button>
            ) : (
              <button className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 transition">Submit Application</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
