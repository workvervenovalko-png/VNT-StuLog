import prisma from "@/lib/prisma";
import ChatClient from "@/components/ChatClient";
import { auth } from "@/lib/auth-helpers";

const ChatPage = async () => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role?.toLowerCase();

  let contacts: any[] = [];

  if (role === "admin") {
    const teachers = await prisma.teacher.findMany();
    const staff = await prisma.staff.findMany();
    contacts = [
      ...teachers.map(t => ({ id: t.id, name: `${t.name} ${t.surname}`, role: "Teacher" })),
      ...staff.map(s => ({ id: s.id, name: `${s.name} ${s.surname}`, role: s.role })),
    ];
  } else if (role === "teacher") {
    const admins = await prisma.admin.findMany();
    const students = await prisma.student.findMany();
    contacts = [
      ...admins.map(a => ({ id: a.id, name: a.username, role: "Admin" })),
      ...students.map(s => ({ id: s.id, name: `${s.name} ${s.surname}`, role: "Student" })),
    ];
  } else if (role === "student") {
    const student = await prisma.student.findFirst({
      where: { username: sessionClaims?.username as string }
    });
    if (student) {
      const lessons = await prisma.lesson.findMany({
        where: { classId: student.classId },
        include: { teacher: true }
      });
      const teachers = Array.from(new Set(lessons.map(l => l.teacher)));
      contacts = teachers.map(t => ({ id: t.id, name: `${t.name} ${t.surname}`, role: "Teacher" }));
    }
  } else if (role === "parent") {
    const parent = await prisma.parent.findFirst({
      where: { username: sessionClaims?.username as string },
      include: { students: { include: { class: { include: { lessons: { include: { teacher: true } } } } } } }
    });
    if (parent) {
      const teacherMap = new Map();
      parent.students.forEach(s => {
        s.class.lessons.forEach(l => {
          teacherMap.set(l.teacher.id, l.teacher);
        });
      });
      contacts = Array.from(teacherMap.values()).map(t => ({ id: t.id, name: `${t.name} ${t.surname}`, role: "Teacher" }));
    }
  }


  return (
    <div className="p-4 h-[calc(100vh-100px)] flex gap-4 overflow-hidden">
      <ChatClient initialContacts={contacts} currentUserId={userId!} />
    </div>
  );
};

export default ChatPage;
