"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Clear the session cookie by calling an api or just clearing it if possible
    const performLogout = async () => {
      await fetch("/api/logout", { method: "POST" });
      router.push("/login");
    };
    performLogout();
  }, [router]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-plSky border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Logging you out safely...</p>
      </div>
    </div>
  );
};

export default LogoutPage;
