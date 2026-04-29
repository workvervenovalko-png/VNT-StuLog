import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seedAdmin() {
  const username = process.env.ADMIN_USERNAME || "puneet";
  const password = process.env.ADMIN_PASSWORD || "123123";
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  await prisma.admin.create({
    data: {
      username,
    },
  });

  console.log("Admin created with ID:", user.id);
  await prisma.$disconnect();
}

seedAdmin();
