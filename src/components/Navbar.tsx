import Image from "next/image";
import { getSession } from "@/lib/auth";
import Link from "next/link";

const Navbar = async () => {
  const session = await getSession();
  const user = session?.user;
  
  return (
    <div className="flex items-center justify-between p-4">
      {/* Search Bar */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Image src="/search.png" alt="" width={14} height={14} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div>
      {/* User Icon */}
      <div className="flex items-center gap-6 justify-end w-full">
        <Link href="/chat" className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <Image src="/message.png" alt="" width={20} height={20} />
        </Link>
        <Link href="/list/announcements" className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <Image src="/announcement.png" alt="" width={20} height={20} />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
            1
          </div>
        </Link>
        <Link href="/profile" className="flex items-center gap-6 cursor-pointer">
          <div className="flex flex-col">
            <span className="text-xs leading-3 font-medium">{user?.username || "Guest"}</span>
            <span className="text-[10px] text-gray-500 text-right">
              {user?.role || "Visitor"}
            </span>
          </div>
          <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border">
             <Image src="/avatar.png" alt="avatar" width={36} height={36} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
