import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("123123", 10);

  console.log("Cleaning up database...");
  await prisma.attendance.deleteMany();
  await prisma.result.deleteMany();
  await prisma.bookIssue.deleteMany();
  await prisma.feePayment.deleteMany();
  await prisma.payroll.deleteMany();
  await prisma.studyMaterial.deleteMany();
  await prisma.smartClass.deleteMany();
  await prisma.event.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.exam.deleteMany();
  
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.parent.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.user.deleteMany();
  
  await prisma.class.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.grade.deleteMany();
  await prisma.book.deleteMany();
  await prisma.feeCategory.deleteMany();
  await prisma.transport.deleteMany();

  console.log("Seeding data...");

  // 1. Create Users for all roles
  const users = [
    { username: "Puneet@28", password: hashedPassword, role: "admin" },
    { username: "teacher1", password: hashedPassword, role: "teacher" },
    { username: "student1", password: hashedPassword, role: "student" },
    { username: "parent1", password: hashedPassword, role: "parent" },
    { username: "finance1", password: hashedPassword, role: "accountant" },
    { username: "librarian1", password: hashedPassword, role: "librarian" },
  ];

  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  // 2. Admin
  await prisma.admin.create({ data: { username: "Puneet@28" } });

  // 3. Grades
  const grades = [];
  for (let i = 1; i <= 10; i++) {
    const g = await prisma.grade.create({ data: { level: i } });
    grades.push(g);
  }

  // 4. Teacher
  const teacher = await prisma.teacher.create({
    data: {
      username: "teacher1",
      name: "John",
      surname: "Teacher",
      email: "teacher1@example.com",
      phone: "9990001111",
      address: "123 Teacher St",
      bloodType: "A+",
      sex: "MALE",
      birthday: new Date("1980-01-01"),
    },
  });

  // 5. Subject
  const subject = await prisma.subject.create({
    data: {
      name: "Mathematics",
      teacherIds: [teacher.id],
    },
  });

  // 6. Class
  const classItem = await prisma.class.create({
    data: {
      name: "1-A",
      capacity: 30,
      gradeId: grades[0].id,
      supervisorId: teacher.id,
    },
  });

  // 7. Parent
  const parent = await prisma.parent.create({
    data: {
      username: "parent1",
      name: "Robert",
      surname: "Parent",
      email: "parent1@example.com",
      phone: "9990002222",
      address: "123 Parent Ave",
    },
  });

  // 8. Student
  const student = await prisma.student.create({
    data: {
      username: "student1",
      name: "Alice",
      surname: "Student",
      email: "student1@example.com",
      phone: "9990003333",
      address: "123 Student Rd",
      bloodType: "O+",
      sex: "FEMALE",
      parentId: parent.id,
      classId: classItem.id,
      gradeId: grades[0].id,
      birthday: new Date("2015-01-01"),
    },
  });

  // 9. Staff (Finance/Accountant & Librarian)
  await prisma.staff.create({
    data: {
      username: "finance1",
      name: "Fred",
      surname: "Finance",
      email: "finance1@example.com",
      phone: "9990004444",
      address: "456 Finance Blvd",
      role: "accountant",
      birthday: new Date("1985-01-01"),
    },
  });

  await prisma.staff.create({
    data: {
      username: "librarian1",
      name: "Lisa",
      surname: "Librarian",
      email: "librarian1@example.com",
      phone: "9990005555",
      address: "789 Library Ln",
      role: "librarian",
      birthday: new Date("1990-01-01"),
    },
  });

  // 10. Fee Category
  const feeCategory = await prisma.feeCategory.create({
    data: {
      name: "Tuition Fee",
      amount: 5000,
      description: "Quarterly Tuition Fee",
    },
  });

  // 11. Lesson
  const lesson = await prisma.lesson.create({
    data: {
      name: "Math 101",
      day: "MONDAY",
      startTime: new Date("2026-04-29T08:00:00Z"),
      endTime: new Date("2026-04-29T09:00:00Z"),
      subjectId: subject.id,
      classId: classItem.id,
      teacherId: teacher.id,
    },
  });

  // 12. Book
  await prisma.book.create({
    data: {
      title: "Math Fundamentals",
      author: "Euler",
      isbn: "MATH123",
      category: "Science",
      totalCopies: 5,
      availableCopies: 5,
    },
  });

  // 13. Transport
  await prisma.transport.create({
    data: {
      route: "North Route",
      busNo: "BUS-001",
      driver: "John Driver",
      phone: "9998887776",
      capacity: 50,
      status: "IDLE",
    },
  });

  // 14. Fee Payment (Pending for Testing)
  await prisma.feePayment.create({
    data: {
      studentId: student.id,
      categoryId: feeCategory.id,
      amountPaid: feeCategory.amount,
      paymentMethod: "ONLINE",
      status: "PENDING",
    },
  });

  console.log("Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
