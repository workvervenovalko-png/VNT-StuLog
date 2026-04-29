import { getSession } from "@/lib/auth";
import SidebarItem from "./SidebarItem";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent", "librarian", "accountant"],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/profile.png",
        label: "Staff",
        href: "/list/staff",
        visible: ["admin"],
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/lesson.png",
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Assignments",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/result.png",
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/attendance.png",
        label: "Attendance",
        href: "/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/sort.png",
        label: "Smart Scan",
        href: "/attendance/scan",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/chat",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/subject.png",
        label: "Library",
        href: "/list/books",
        visible: ["admin", "teacher", "student", "librarian"],
      },
      {
        icon: "/assignment.png",
        label: "Book Issues",
        href: "/list/book-issues",
        visible: ["admin", "librarian", "student", "parent"],
      },
      {
        icon: "/finance.png",
        label: "Finance",
        href: "/list/finance",
        visible: ["admin", "accountant", "student", "parent"],
      },
      {
        icon: "/profile.png",
        label: "Payroll",
        href: "/finance/payroll",
        visible: ["admin", "accountant"],
      },
      {
        icon: "/class.png",
        label: "Transport",
        href: "/transport",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/lesson.png",
        label: "Study Material",
        href: "/list/materials",
        visible: ["admin", "teacher", "student"],
      },
      {
        icon: "/lesson.png",
        label: "Smart Class",
        href: "/classroom",
        visible: ["admin", "teacher", "student"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "School Profile",
        href: "/school-profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = async () => {
  const session = await getSession();
  const role = session?.user?.role?.toLowerCase() as string;
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return <SidebarItem key={item.label} item={item} />;
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
