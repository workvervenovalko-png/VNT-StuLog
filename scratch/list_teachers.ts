import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function listTeachers() {
  const users = await prisma.user.findMany({ where: { role: "TEACHER" } });
  const teachers = await prisma.teacher.findMany();
  console.log("Teacher Users:", JSON.stringify(users, null, 2));
  console.log("Teacher Profiles:", JSON.stringify(teachers, null, 2));
  await prisma.$disconnect();
}

listTeachers();
