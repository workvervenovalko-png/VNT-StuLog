import Image from "next/image";
import Link from "next/link";

import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 overflow-y-auto scrollbar-hide">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block font-bold">{process.env.NEXT_PUBLIC_SCHOOL_NAME || "EduSphere"}</span>
        </Link>
        <Menu />
        <div className="mt-auto pt-4 border-t border-gray-100 hidden lg:block">
           <p className="text-[10px] text-gray-400 font-medium">Developed by</p>
           <a 
              href={process.env.NEXT_PUBLIC_DEVELOPER_URL} 
              target="_blank" 
              className="text-[10px] text-black font-bold uppercase tracking-tighter hover:underline"
           >
              {process.env.NEXT_PUBLIC_DEVELOPER_NAME}
           </a>
        </div>
      </div>
      {/* Main Content Area */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-y-auto flex flex-col">
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
