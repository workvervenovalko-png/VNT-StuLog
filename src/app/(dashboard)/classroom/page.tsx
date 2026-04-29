import prisma from "@/lib/prisma";
import SmartClassroomClient from "@/components/SmartClassroomClient";

import { auth } from "@/lib/auth-helpers";

const SmartClassroomPage = async () => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const data = await prisma.smartClass.findMany({
    include: {
      teacher: true,
      class: true,
    },
  });

  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-plSky">Smart Classroom</h1>
           <p className="text-sm text-gray-500">Live Interactive Lectures & Engagement Tracking</p>
        </div>
        {role !== "student" && (
          <button className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-red-600 transition">
             <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
             Go Live Now
          </button>
        )}
      </div>
      <SmartClassroomClient initialData={data} />
    </div>
  );
};

export default SmartClassroomPage;
