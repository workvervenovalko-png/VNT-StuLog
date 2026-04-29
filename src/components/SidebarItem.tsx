"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SidebarItem = ({ item }: { item: any }) => {
  const pathname = usePathname();
  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

  return (
    <Link
      href={item.href}
      className={`flex items-center justify-center lg:justify-start gap-4 py-2 md:px-2 rounded-md transition-colors ${
        isActive 
          ? "bg-plSky text-white" 
          : "text-gray-500 hover:bg-plSkyLight"
      }`}
    >
      <Image 
        src={item.icon} 
        alt="" 
        width={20} 
        height={20} 
        className={isActive ? "brightness-0 invert" : ""}
      />
      <span className="hidden lg:block">{item.label}</span>
    </Link>
  );
};

export default SidebarItem;
