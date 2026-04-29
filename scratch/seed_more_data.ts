import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seedMoreTestData() {
  const student = await prisma.student.findUnique({ where: { username: "student1" } });
  if (!student) {
    console.log("Student not found");
    return;
  }

  const subject = await prisma.subject.findFirst();
  const teacher = await prisma.teacher.findFirst();
  const classItem = await prisma.class.findFirst({ where: { id: student.classId } });

  if (!subject || !teacher || !classItem) {
    console.log("Subject, Teacher or Class not found");
    return;
  }

  // 1. Create Lesson
  const lesson = await prisma.lesson.create({
    data: {
      name: "Math Lesson 1",
      day: "MONDAY",
      startTime: new Date(new Date().setHours(9, 0, 0)),
      endTime: new Date(new Date().setHours(10, 0, 0)),
      subjectId: subject.id,
      classId: classItem.id,
      teacherId: teacher.id,
    },
  });

  // 2. Create Attendance
  await prisma.attendance.createMany({
    data: [
      { date: new Date(), present: true, studentId: student.id, lessonId: lesson.id },
      { date: new Date(Date.now() - 86400000), present: true, studentId: student.id, lessonId: lesson.id },
      { date: new Date(Date.now() - 172800000), present: false, studentId: student.id, lessonId: lesson.id },
    ],
  });

  // 3. Create Exam
  const exam = await prisma.exam.create({
    data: {
      title: "Midterm Math",
      startTime: new Date(),
      endTime: new Date(Date.now() + 3600000),
      lessonId: lesson.id,
    },
  });

  // 4. Create Result
  await prisma.result.create({
    data: {
      score: 85,
      examId: exam.id,
      studentId: student.id,
    },
  });

  console.log("Added Lesson, Attendance, Exam, and Result for student1");
  await prisma.$disconnect();
}

seedMoreTestData().catch(console.error);
