import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  console.log("🌱 Seeding database...");

  // --- GRADES ---
  const grades = [];
  for (let i = 1; i <= 12; i++) {
    const grade = await prisma.grade.create({ data: { level: i } });
    grades.push(grade);
    console.log(`  Grade ${i} created`);
  }

  // --- PARENTS ---
  const parentPass = await bcrypt.hash("123123", 10);
  const parentUser = await prisma.user.create({
    data: { username: "parent1", password: parentPass, role: "PARENT" },
  });
  const parent1 = await prisma.parent.create({
    data: {
      id: parentUser.id,
      username: "parent1",
      name: "Rajesh",
      surname: "Sharma",
      email: "rajesh@example.com",
      phone: "9876543210",
      address: "123 Parent Colony, Lucknow",
    },
  });
  console.log("  Parent1 (Rajesh Sharma) created");

  // --- TEACHER ---
  const teacherPass = await bcrypt.hash("123123", 10);
  const teacherUser = await prisma.user.create({
    data: { username: "teacher1", password: teacherPass, role: "TEACHER" },
  });
  const teacher1 = await prisma.teacher.create({
    data: {
      id: teacherUser.id,
      username: "teacher1",
      name: "Priya",
      surname: "Verma",
      email: "priya@example.com",
      phone: "9988776655",
      address: "45 Faculty Road, Lucknow",
      bloodType: "B+",
      sex: "FEMALE",
      birthday: new Date("1985-06-15"),
    },
  });
  console.log("  Teacher1 (Priya Verma) created");

  // --- SUBJECTS ---
  const sub1 = await prisma.subject.create({
    data: { name: "Mathematics", teacherIds: [teacher1.id] },
  });
  const sub2 = await prisma.subject.create({
    data: { name: "Science", teacherIds: [teacher1.id] },
  });
  const sub3 = await prisma.subject.create({
    data: { name: "English" },
  });
  const sub4 = await prisma.subject.create({
    data: { name: "Hindi" },
  });
  console.log("  Subjects created (Maths, Science, English, Hindi)");

  // --- CLASSES ---
  const class10A = await prisma.class.create({
    data: {
      name: "10-A",
      capacity: 40,
      gradeId: grades[9].id, // Grade 10
      supervisorId: teacher1.id,
    },
  });
  const class9B = await prisma.class.create({
    data: {
      name: "9-B",
      capacity: 35,
      gradeId: grades[8].id, // Grade 9
    },
  });
  console.log("  Classes created (10-A, 9-B)");

  // --- LESSONS ---
  const lesson1 = await prisma.lesson.create({
    data: {
      name: "Mathematics - 10A",
      day: "MONDAY",
      startTime: new Date("2026-01-01T09:00:00"),
      endTime: new Date("2026-01-01T09:45:00"),
      subjectId: sub1.id,
      classId: class10A.id,
      teacherId: teacher1.id,
    },
  });
  const lesson2 = await prisma.lesson.create({
    data: {
      name: "Science - 10A",
      day: "TUESDAY",
      startTime: new Date("2026-01-01T10:00:00"),
      endTime: new Date("2026-01-01T10:45:00"),
      subjectId: sub2.id,
      classId: class10A.id,
      teacherId: teacher1.id,
    },
  });
  console.log("  Lessons created");

  // --- STUDENTS ---
  const studentPass = await bcrypt.hash("123123", 10);
  const studentUser1 = await prisma.user.create({
    data: { username: "student1", password: studentPass, role: "STUDENT" },
  });
  const student1 = await prisma.student.create({
    data: {
      id: studentUser1.id,
      username: "student1",
      name: "Alice",
      surname: "Smith",
      email: "alice@example.com",
      phone: "8877665544",
      address: "456 Student Ave, Lucknow",
      bloodType: "O+",
      sex: "FEMALE",
      birthday: new Date("2008-01-01"),
      parentId: parent1.id,
      classId: class10A.id,
      gradeId: grades[9].id,
    },
  });
  console.log("  Student1 (Alice Smith) created");

  const studentUser2 = await prisma.user.create({
    data: { username: "student2", password: studentPass, role: "STUDENT" },
  });
  const student2 = await prisma.student.create({
    data: {
      id: studentUser2.id,
      username: "student2",
      name: "Rahul",
      surname: "Kumar",
      email: "rahul@example.com",
      phone: "7766554433",
      address: "789 Student Lane, Lucknow",
      bloodType: "A+",
      sex: "MALE",
      birthday: new Date("2008-05-10"),
      parentId: parent1.id,
      classId: class10A.id,
      gradeId: grades[9].id,
    },
  });
  console.log("  Student2 (Rahul Kumar) created");

  // --- STAFF (Librarian & Accountant) ---
  const libPass = await bcrypt.hash("123123", 10);
  const libUser = await prisma.user.create({
    data: { username: "librarian1", password: libPass, role: "LIBRARIAN" },
  });
  await prisma.staff.create({
    data: {
      id: libUser.id,
      username: "librarian1",
      name: "Amit",
      surname: "Gupta",
      email: "amit@example.com",
      phone: "6655443322",
      address: "Library Wing, Lucknow",
      role: "librarian",
      birthday: new Date("1990-03-20"),
    },
  });
  console.log("  Staff: Librarian (Amit Gupta) created");

  const accPass = await bcrypt.hash("123123", 10);
  const accUser = await prisma.user.create({
    data: { username: "accountant1", password: accPass, role: "ACCOUNTANT" },
  });
  await prisma.staff.create({
    data: {
      id: accUser.id,
      username: "accountant1",
      name: "Sunita",
      surname: "Devi",
      email: "sunita@example.com",
      phone: "5544332211",
      address: "Admin Block, Lucknow",
      role: "accountant",
      birthday: new Date("1988-11-05"),
    },
  });
  console.log("  Staff: Accountant (Sunita Devi) created");

  // --- BOOKS ---
  const book1 = await prisma.book.create({
    data: {
      title: "NCERT Mathematics Class 10",
      author: "NCERT",
      isbn: "978-81-7450-001-1",
      category: "Textbook",
      totalCopies: 50,
      availableCopies: 48,
    },
  });
  const book2 = await prisma.book.create({
    data: {
      title: "Wings of Fire",
      author: "APJ Abdul Kalam",
      isbn: "978-81-7371-146-6",
      category: "Biography",
      totalCopies: 20,
      availableCopies: 19,
    },
  });
  console.log("  Books created");

  // --- BOOK ISSUES ---
  await prisma.bookIssue.create({
    data: {
      bookId: book1.id,
      studentId: student1.id,
      dueDate: new Date("2026-05-15"),
      status: "ISSUED",
    },
  });
  await prisma.bookIssue.create({
    data: {
      bookId: book2.id,
      studentId: student2.id,
      dueDate: new Date("2026-05-20"),
      status: "ISSUED",
    },
  });
  console.log("  Book issues created");

  // --- FEE CATEGORIES ---
  const feeCat1 = await prisma.feeCategory.create({
    data: { name: "Tuition Fee", amount: 5000, description: "Monthly tuition" },
  });
  const feeCat2 = await prisma.feeCategory.create({
    data: { name: "Library Fee", amount: 500, description: "Annual library" },
  });
  console.log("  Fee categories created");

  // --- FEE PAYMENTS ---
  await prisma.feePayment.create({
    data: {
      studentId: student1.id,
      categoryId: feeCat1.id,
      amountPaid: 5000,
      paymentMethod: "Cash",
      status: "PAID",
    },
  });
  await prisma.feePayment.create({
    data: {
      studentId: student2.id,
      categoryId: feeCat1.id,
      amountPaid: 5000,
      paymentMethod: "Online",
      status: "PENDING",
    },
  });
  console.log("  Fee payments created");

  // --- EXAMS ---
  await prisma.exam.create({
    data: {
      title: "Mid Term Maths",
      startTime: new Date("2026-06-01T09:00:00"),
      endTime: new Date("2026-06-01T12:00:00"),
      lessonId: lesson1.id,
    },
  });
  console.log("  Exam created");

  // --- ASSIGNMENTS ---
  await prisma.assignment.create({
    data: {
      title: "Chapter 3 - Polynomials",
      startDate: new Date("2026-04-25"),
      dueDate: new Date("2026-05-01"),
      lessonId: lesson1.id,
    },
  });
  console.log("  Assignment created");

  // --- ATTENDANCE ---
  await prisma.attendance.create({
    data: {
      date: new Date("2026-04-28"),
      present: true,
      studentId: student1.id,
      lessonId: lesson1.id,
    },
  });
  await prisma.attendance.create({
    data: {
      date: new Date("2026-04-28"),
      present: false,
      studentId: student2.id,
      lessonId: lesson1.id,
    },
  });
  console.log("  Attendance marked");

  // --- EVENTS ---
  await prisma.event.create({
    data: {
      title: "Annual Sports Day",
      description: "Annual sports day celebration with inter-house competitions",
      startTime: new Date("2026-05-10T08:00:00"),
      endTime: new Date("2026-05-10T16:00:00"),
      classId: class10A.id,
    },
  });
  console.log("  Event created");

  // --- ANNOUNCEMENTS ---
  await prisma.announcement.create({
    data: {
      title: "Summer Vacation Notice",
      description: "School will remain closed from May 20 to June 30 for summer vacation.",
      date: new Date("2026-05-01"),
      classId: class10A.id,
    },
  });
  console.log("  Announcement created");

  // --- TRANSPORT ---
  await prisma.transport.create({
    data: {
      route: "Gomti Nagar - Aliganj",
      busNo: "UP32-BUS-001",
      driver: "Ram Singh",
      phone: "9999888877",
      status: "IDLE",
      capacity: 45,
    },
  });
  console.log("  Transport created");

  console.log("\n✅ Seeding complete! All data inserted successfully.");
  console.log("\n📋 Login Credentials:");
  console.log("  Admin:      puneet / 123123");
  console.log("  Teacher:    teacher1 / 123123");
  console.log("  Student:    student1 / 123123");
  console.log("  Student2:   student2 / 123123");
  console.log("  Parent:     parent1 / 123123");
  console.log("  Librarian:  librarian1 / 123123");
  console.log("  Accountant: accountant1 / 123123");

  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
