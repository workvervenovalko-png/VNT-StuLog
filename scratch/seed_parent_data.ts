import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seedParentData() {
  const aliceId = "cmoiqzb2w0001x9d44xiiq6hu";
  const parentId = "parent_1";

  // 1. Ensure Parent exists
  await prisma.parent.upsert({
    where: { id: parentId },
    update: {},
    create: {
      id: parentId,
      username: "parent1",
      name: "John",
      surname: "Doe",
      phone: "1234567890",
      address: "123 Main St",
    },
  });

  // 2. Ensure Student Alice exists and is linked to Parent
  await prisma.student.update({
    where: { id: aliceId },
    data: { parentId: parentId },
  });

  // 3. Create Fee Category and Payment
  const tuitionFee = await prisma.feeCategory.upsert({
    where: { id: 1 },
    update: {},
    create: { name: "Tuition Fee", amount: 2000 },
  });

  await prisma.feePayment.create({
    data: {
      studentId: aliceId,
      categoryId: tuitionFee.id,
      amountPaid: 2000,
      status: "PAID",
      paymentDate: new Date(),
      paymentMethod: "CASH",
    },
  });

  // 4. Create Attendance Log
  const lesson = await prisma.lesson.findFirst();
  if (lesson) {
    await prisma.attendance.create({
      data: {
        date: new Date(),
        present: true,
        studentId: aliceId,
        lessonId: lesson.id,
      },
    });
  }

  // 5. Create Exam Result
  const exam = await prisma.exam.findFirst();
  if (exam) {
    await prisma.result.create({
      data: {
        score: 85,
        studentId: aliceId,
        examId: exam.id,
      },
    });
  }

  console.log("Seeded data for Parent (John Doe) and Student (Alice Smith)");
  await prisma.$disconnect();
}

seedParentData();
