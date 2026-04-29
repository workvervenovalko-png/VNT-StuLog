import Image from "next/image";
import prisma from "@/lib/prisma";

import { auth } from "@/lib/auth-helpers";
import FormContainer from "@/components/FormContainer";

const StudyMaterialsPage = async () => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const data = await prisma.studyMaterial.findMany({
    include: {
      subject: true,
      teacher: true,
    },
  });

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-plSky">Digital Study Material</h1>
        {role !== "student" && (
          <FormContainer table="studyMaterial" type="create" />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {data.length > 0 ? (
          data.map((file) => (
            <div key={file.id} className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4 hover:shadow-lg transition cursor-pointer group">
               <div className="w-12 h-12 bg-plSkyLight rounded-xl flex items-center justify-center text-plSky font-bold group-hover:bg-plSky group-hover:text-white transition">
                  {file.type}
               </div>
               <div className="flex-1">
                  <h3 className="text-sm font-bold truncate">{file.title}</h3>
                  <div className="flex justify-between mt-1">
                     <span className="text-[10px] text-gray-400">{file.subject.name} | {file.date.toLocaleDateString()}</span>
                     <span className="text-[10px] text-plSky font-medium">{file.teacher.name}</span>
                  </div>
               </div>
               <button className="p-2 bg-gray-50 rounded-full hover:bg-plSkyLight transition">
                  <Image src="/view.png" alt="download" width={16} height={16} />
               </button>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-400">
             <Image src="/noData.png" alt="No data" width={100} height={100} className="opacity-10 mb-4" />
             <p className="text-lg font-medium italic">No digital resources found</p>
             <p className="text-sm">Teachers can upload notes and materials for students</p>
          </div>
        )}
      </div>
      
      <div className="mt-8 bg-blue-50 p-6 rounded-2xl flex items-center gap-6">
         <div className="w-16 h-16 bg-plSky rounded-full flex items-center justify-center text-white text-2xl">📦</div>
         <div>
            <h2 className="text-lg font-bold text-plSky">Cloud Storage Status</h2>
            <p className="text-sm text-gray-500">Real-time repository for institutional knowledge.</p>
            <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                <div className="h-full bg-plSky w-[5%] rounded-full"></div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default StudyMaterialsPage;
