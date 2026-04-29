import Image from "next/image";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth-helpers";
import FormContainer from "@/components/FormContainer";

const AttendancePage = async () => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // Fetch real summary data
  const totalStudents = await prisma.student.count();
  const attendanceLogs = await prisma.attendance.findMany({
    take: 10,
    orderBy: { date: "desc" },
    include: {
      student: true,
      lesson: true,
    },
    where: role === "student" ? { studentId: userId! } : {},
  });

  // Calculate today's stats (mocking today's total for demo if no real logs today)
  const presentToday = await prisma.attendance.count({
    where: {
      date: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
      present: true,
    }
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 min-h-[500px]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-plSky">Attendance Management</h1>
        {role !== "student" && (
          <FormContainer table="attendance" type="create" />
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-plSkyLight p-6 rounded-2xl">
            <h3 className="text-plSky font-bold text-sm">Present Today</h3>
            <p className="text-3xl font-extrabold text-plSky mt-2">
                {presentToday} <span className="text-xs font-normal opacity-60">/ {totalStudents}</span>
            </p>
         </div>
         <div className="bg-plPurpleLight p-6 rounded-2xl">
            <h3 className="text-plSky font-bold text-sm">Absents Recorded</h3>
            <p className="text-3xl font-extrabold text-plSky mt-2">
                {await prisma.attendance.count({ where: { present: false } })}
            </p>
         </div>
         <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h3 className="text-gray-400 font-bold text-sm">System Status</h3>
            <p className="text-3xl font-extrabold text-gray-500 mt-2">Active</p>
         </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
         <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
            <span className="text-xs font-bold text-gray-400">
                {role === "student" ? "MY ATTENDANCE LOGS" : "RECENT INSTITUTIONAL LOGS"}
            </span>
            <button className="text-xs text-plSky font-bold">View Full History</button>
         </div>
         <div className="p-4 flex flex-col gap-4">
            {attendanceLogs.length > 0 ? (
                attendanceLogs.map(log => (
                    <div key={log.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition">
                        <div className="flex gap-4 items-center">
                            <div className="w-10 h-10 bg-plSkyLight rounded-full flex items-center justify-center text-plSky font-bold">
                                {log.student.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold">{log.student.name} {log.student.surname}</h4>
                                <span className="text-[10px] text-gray-400">
                                    {log.lesson.name} • {new Date(log.date).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${log.present ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                            {log.present ? "PRESENT" : "ABSENT"}
                        </span>
                    </div>
                ))
            ) : (
                <p className="text-center py-10 text-gray-400 text-sm italic">No attendance records found.</p>
            )}
         </div>
      </div>
    </div>
  );
};

export default AttendancePage;
