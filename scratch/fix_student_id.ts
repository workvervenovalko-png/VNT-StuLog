import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function fixStudentId() {
  const user = await prisma.user.findUnique({ where: { username: "student1" } });
  if (user) {
    // Delete old student and create new one with correct ID
    // or just update if ID isn't a primary key that can't be changed (it is)
    // Prisma doesn't support updating the ID easily.
    const oldStudent = await prisma.student.findUnique({ where: { username: "student1" } });
    if (oldStudent) {
      await prisma.student.delete({ where: { id: oldStudent.id } });
      await prisma.student.create({
        data: {
          ...oldStudent,
          id: user.id
        }
      });
      console.log(`Fixed Student ID for student1 to ${user.id}`);
    }
  }
  await prisma.$disconnect();
}

fixStudentId();
