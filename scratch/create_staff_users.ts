import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function createStaffUsers() {
  const hashedPassword = await bcrypt.hash("123123", 10);

  // Librarian
  const librarianUser = await prisma.user.upsert({
    where: { username: "librarian1" },
    update: {},
    create: {
      username: "librarian1",
      password: hashedPassword,
      role: "LIBRARIAN",
    },
  });

  await prisma.staff.upsert({
    where: { username: "librarian1" },
    update: {},
    create: {
      id: librarianUser.id,
      username: "librarian1",
      name: "Library",
      surname: "Manager",
      email: "librarian@example.com",
      address: "School Library",
      role: "librarian",
      birthday: new Date("1980-01-01"),
    },
  });

  // Accountant
  const accountantUser = await prisma.user.upsert({
    where: { username: "accountant1" },
    update: {},
    create: {
      username: "accountant1",
      password: hashedPassword,
      role: "ACCOUNTANT",
    },
  });

  await prisma.staff.upsert({
    where: { username: "accountant1" },
    update: {},
    create: {
      id: accountantUser.id,
      username: "accountant1",
      name: "Finance",
      surname: "Officer",
      email: "accountant@example.com",
      address: "Admin Block",
      role: "accountant",
      birthday: new Date("1985-05-15"),
    },
  });

  console.log("Created Librarian and Accountant users");
  await prisma.$disconnect();
}

createStaffUsers();
