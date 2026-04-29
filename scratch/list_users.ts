import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function listUsers() {
  const users = await prisma.user.findMany();
  const students = await prisma.student.findMany();
  console.log("Users:", JSON.stringify(users, null, 2));
  console.log("Students:", JSON.stringify(students, null, 2));
  await prisma.$disconnect();
}

listUsers();
