import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function checkParent() {
  const profile = await prisma.parent.findFirst({ where: { id: "parent_1" } });
  const user = await prisma.user.findFirst({ where: { id: "parent_1" } });
  console.log("Parent Profile:", JSON.stringify(profile, null, 2));
  console.log("Parent User:", JSON.stringify(user, null, 2));
  await prisma.$disconnect();
}

checkParent();
