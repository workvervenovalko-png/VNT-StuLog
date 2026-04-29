import Image from "next/image";
import prisma from "@/lib/prisma";

const UserCard = async ({
  type,
}: {
  type: "admin" | "teacher" | "student" | "parent" | "books" | "issued" | "overdue" | "fines" | "feeCollection" | "payroll" | "pendingFees" | "expenses";
}) => {
  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
    books: prisma.book,
    issued: prisma.bookIssue,
    overdue: prisma.bookIssue,
    fines: prisma.feePayment,
    feeCollection: prisma.feePayment,
    payroll: prisma.payroll,
    pendingFees: prisma.feePayment,
    expenses: prisma.payroll,
  };

  const data = type === "issued" 
    ? await prisma.bookIssue.count({ where: { status: "ISSUED" } })
    : type === "feeCollection"
    ? await prisma.feePayment.count({ where: { status: "PAID" } })
    : type === "pendingFees"
    ? await prisma.feePayment.count({ where: { status: "PENDING" } })
    : type === "payroll"
    ? await prisma.payroll.count()
    : type === "expenses"
    ? await prisma.payroll.count({ where: { status: "PAID" } })
    : await modelMap[type]?.count() || 0;

  return (
    <div className="rounded-2xl odd:bg-plPurple even:bg-plYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2026/27
        </span>
        <Image src="/more.png" alt="" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">{data}</h1>
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
    </div>
  );
};

export default UserCard;
