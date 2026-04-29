import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seedTestData() {
  const hashedPassword = await bcrypt.hash("123123", 10);

  console.log("Cleaning up database...");
  await prisma.user.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.parent.deleteMany();
  await prisma.grade.deleteMany();
  await prisma.class.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.book.deleteMany();

  console.log("Seeding data...");

  // 1. Create Users
  const users = [
    { username: "Puneet@28", password: hashedPassword, role: "admin" },
    { username: "teacher1", password: hashedPassword, role: "teacher" },
    { username: "student1", password: hashedPassword, role: "student" },
    { username: "parent1", password: hashedPassword, role: "parent" },
    { username: "finance1", password: hashedPassword, role: "finance" },
    { username: "librarian1", password: hashedPassword, role: "librarian" },
  ];

  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  // 2. Create Admin Profile
  await prisma.admin.create({
    data: { username: "Puneet@28" },
  });

  // 3. Create Grade and Class
  const grade = await prisma.grade.create({
    data: { level: 1 },
  });

  const teacher = await prisma.teacher.create({
    data: {
      username: "teacher1",
      name: "John",
      surname: "Teacher",
      address: "Teacher Address",
      bloodType: "A+",
      sex: "MALE",
      birthday: new Date("1980-01-01"),
    },
  });

  const classItem = await prisma.class.create({
    data: {
      name: "1-A",
      capacity: 30,
      gradeId: grade.id,
      supervisorId: teacher.id,
    },
  });

  // 4. Create Parent
  const parent = await prisma.parent.create({
    data: {
      username: "parent1",
      name: "Robert",
      surname: "Parent",
      phone: "1234567891",
      address: "Parent Address",
    },
  });

  // 5. Create Student
  const student = await prisma.student.create({
    data: {
      username: "student1",
      name: "Alice",
      surname: "Student",
      address: "Student Address",
      bloodType: "O+",
      sex: "FEMALE",
      parentId: parent.id,
      classId: classItem.id,
      gradeId: grade.id,
      birthday: new Date("2015-01-01"),
    },
  });

  // 6. Create Staff (Finance & Librarian)
  await prisma.staff.create({
    data: {
      username: "finance1",
      name: "Fred",
      surname: "Finance",
      address: "Finance Address",
      role: "finance",
      birthday: new Date("1985-01-01"),
    },
  });

  await prisma.staff.create({
    data: {
      username: "librarian1",
      name: "Lisa",
      surname: "Librarian",
      address: "Librarian Address",
      role: "librarian",
      birthday: new Date("1990-01-01"),
    },
  });

  // 7. Create Subject and Lesson
  const subject = await prisma.subject.create({
    data: {
      name: "Math",
      teacherIds: [teacher.id],
    },
  });

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

  // 8. Create Book for Library
  await prisma.book.create({
    data: {
      title: "Introduction to Math",
      author: "Leonhard Euler",
      isbn: "978-0123456789",
      category: "Education",
      totalCopies: 10,
      availableCopies: 10,
    },
  });

  console.log("Seeding complete!");
  await prisma.$disconnect();
}

seedTestData().catch(console.error);
