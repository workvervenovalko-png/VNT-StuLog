import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function createParentUser() {
  const hashedPassword = await bcrypt.hash("123123", 10);
  await prisma.user.upsert({
    where: { username: "parent1" },
    update: {},
    create: {
      id: "parent_1",
      username: "parent1",
      password: hashedPassword,
      role: "PARENT",
    },
  });
  console.log("Created User for parent1 with password 123123");
  await prisma.$disconnect();
}

createParentUser();
