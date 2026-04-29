import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function checkAlice() {
  const alice = await prisma.student.findFirst({
    where: { name: "Alice" }
  });
  console.log("Alice Details:", alice);
  await prisma.$disconnect();
}

checkAlice();
