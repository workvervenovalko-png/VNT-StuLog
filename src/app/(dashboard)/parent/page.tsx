import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth-helpers";


const ParentPage = async () => {
  const { userId } = await auth();
  const currentUserId = userId;
  
  const students = await prisma.student.findMany({
    where: {
      parentId: currentUserId!,
    },
  });

  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 flex flex-col gap-8">
        {students.map((student) => (
          <div className="bg-white p-4 rounded-md shadow-sm" key={student.id}>
            <h1 className="text-xl font-semibold mb-4 text-plSky">
              Schedule ({student.name + " " + student.surname})
            </h1>
            <BigCalendarContainer type="classId" id={student.classId} />
          </div>
        ))}
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default ParentPage;
