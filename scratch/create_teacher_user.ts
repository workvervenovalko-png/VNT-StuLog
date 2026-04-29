import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function createTeacherUser() {
  const hashedPassword = await bcrypt.hash("123123", 10);
  await prisma.user.upsert({
    where: { username: "teacher1" },
    update: {},
    create: {
      id: "teacher_real_1", // Matching the ID from Teacher Profile
      username: "teacher1",
      password: hashedPassword,
      role: "TEACHER",
    },
  });
  console.log("Created User for teacher1 with password 123123");
  await prisma.$disconnect();
}

createTeacherUser();
