import Image from "next/image";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

const ProfilePage = async () => {
  const session = await getSession();
  const user = session?.user;

  // Fetch detailed profile data based on role
  let profileData: any = null;
  if (user?.role === "ADMIN") {
     profileData = { name: "Puneet", surname: "Admin", email: "puneet@educore.vnt", phone: "+91 98765 43210" };
  } else if (user?.role === "STUDENT") {
     const student = await prisma.student.findUnique({ where: { username: user.username } });
     profileData = student;
  }

  return (
    <div className="p-4 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-plSky">My Profile</h1>
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col md:flex-row gap-10 items-center">
         <div className="relative group">
            <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-plSky to-plPurple p-1">
               <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white shadow-inner">
                  <Image src={profileData?.img || "/noAvatar.png"} alt="profile" width={100} height={100} className="opacity-50" />
               </div>
            </div>
            <button className="absolute bottom-2 right-2 p-3 bg-plSky text-white rounded-full shadow-lg hover:scale-110 transition group-hover:rotate-12">
               <Image src="/create.png" alt="edit" width={14} height={14} className="invert" />
            </button>
         </div>

         <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-plSky">
               {profileData ? `${profileData.name} ${profileData.surname}` : "User"}
            </h2>
            <p className="text-gray-400 font-medium">
               {user?.role} • VNT EduCore
            </p>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">
               <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                     <Image src="/mail.png" alt="email" width={16} height={16} className="opacity-40" />
                  </div>
                  <div>
                     <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Email</p>
                     <p className="text-sm font-bold text-plSky">{profileData?.email || "-"}</p>
                  </div>
               </div>
               <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                     <Image src="/phone.png" alt="phone" width={16} height={16} className="opacity-40" />
                  </div>
                  <div>
                     <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Contact</p>
                     <p className="text-sm font-bold text-plSky">{profileData?.phone || "-"}</p>
                  </div>
               </div>
            </div>
            
            <button className="mt-10 px-8 py-3 bg-plSky text-white rounded-xl font-bold shadow-xl shadow-plSky/20 hover:bg-blue-900 transition flex items-center gap-3">
               Edit Profile Settings
            </button>
         </div>
      </div>
    </div>
  );
};

export default ProfilePage;

