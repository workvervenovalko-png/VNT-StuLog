"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        router.push(`/${data.role}`);
      } else {
        const data = await res.json();
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#f0f4f8]">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-6 border border-gray-100">
        <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-plSky rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">{(process.env.NEXT_PUBLIC_SCHOOL_NAME || "V")[0]}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-plSky mt-4">{process.env.NEXT_PUBLIC_SCHOOL_NAME || "VNT EduCore"}</h1>
            <p className="text-gray-400 text-sm">{process.env.NEXT_PUBLIC_SCHOOL_SLOGAN || "Secure Institutional Access"}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-4">
          {error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded-md text-center">{error}</p>}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Username</label>
            <input
              type="text"
              className="p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-plSky/20 focus:border-plSky transition-all"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</label>
            <input
              type="password"
              className="p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-plSky/20 focus:border-plSky transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="bg-plSky text-white p-3 rounded-xl font-bold hover:bg-blue-900 shadow-lg shadow-blue-900/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
            Sign In
          </button>
        </form>
        
        <div className="mt-4 text-center flex flex-col gap-1">
            <p className="text-[10px] text-gray-400">© 2024 {process.env.NEXT_PUBLIC_SCHOOL_NAME}. All rights reserved.</p>
            <a 
              href={process.env.NEXT_PUBLIC_DEVELOPER_URL} 
              target="_blank" 
              className="text-[10px] text-black font-semibold italic hover:underline"
            >
              Developed by {process.env.NEXT_PUBLIC_DEVELOPER_NAME}
            </a>
        </div>
      </div>
    </div>
  );
}
