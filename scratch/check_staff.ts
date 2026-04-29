import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function checkStaff() {
  const staff = await prisma.staff.findMany();
  console.log("Staff Roles:", staff.map(s => s.role));
  await prisma.$disconnect();
}

checkStaff();
