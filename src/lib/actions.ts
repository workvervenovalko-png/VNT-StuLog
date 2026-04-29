"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import Razorpay from "razorpay";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { auth } from "./auth-helpers";

import {
  ClassSchema,
  ExamSchema,
  StudentSchema,
  SubjectSchema,
  TeacherSchema,
} from "./formValidationSchemas";

type CurrentState = { success: boolean; error: boolean };

export const createSubject = async (
  currentState: CurrentState,
  data: any
) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers?.map((teacherId: string) => ({ id: teacherId })) || [],
        },
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateSubject = async (
  currentState: CurrentState,
  data: SubjectSchema
) => {
  try {
    await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteSubject = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.subject.delete({
      where: {
        id: id,
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createClass = async (
  currentState: CurrentState,
  data: ClassSchema
) => {
  try {
    await prisma.class.create({
      data,
    });

    // revalidatePath("/list/class");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateClass = async (
  currentState: CurrentState,
  data: ClassSchema
) => {
  try {
    await prisma.class.update({
      where: {
        id: data.id,
      },
      data,
    });

    // revalidatePath("/list/class");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteClass = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.class.delete({
      where: {
        id: id,
      },
    });

    // revalidatePath("/list/class");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password!, 10);

    await prisma.teacher.create({
      data: {
        id: data.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: new Date(data.birthday),
        subjects: {
          connect: data.subjects?.map((subjectId: string) => ({
            id: subjectId,
          })),
        },
      },
    });

    await prisma.user.create({
      data: {
        id: data.id,
        username: data.username,
        password: hashedPassword,
        role: "TEACHER",
      },
    });

    // revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  if (!data.id) {
    return { success: false, error: true };
  }
  try {
    // User update logic would go here

    await prisma.teacher.update({
      where: {
        id: data.id,
      },
      data: {
        ...(data.password !== "" && { password: data.password }),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          set: data.subjects?.map((subjectId: string) => ({
            id: subjectId,
          })),
        },
      },
    });
    // revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteTeacher = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    // User deletion handled by ID

    await prisma.teacher.delete({
      where: {
        id: id,
      },
    });

    // revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createStudent = async (
  currentState: CurrentState,
  data: StudentSchema
) => {
  console.log(data);
  try {
    const classItem = await prisma.class.findUnique({
      where: { id: data.classId },
      include: { _count: { select: { students: true } } },
    });

    if (classItem && classItem.capacity === classItem._count.students) {
      return { success: false, error: true };
    }

    const hashedPassword = await bcrypt.hash(data.password!, 10);

    await prisma.student.create({
      data: {
        id: data.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: new Date(data.birthday),
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });

    await prisma.user.create({
      data: {
        id: data.id,
        username: data.username,
        password: hashedPassword,
        role: "STUDENT",
      },
    });

    // revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateStudent = async (
  currentState: CurrentState,
  data: StudentSchema
) => {
  if (!data.id) {
    return { success: false, error: true };
  }
  try {
    // User update logic would go here

    await prisma.student.update({
      where: {
        id: data.id,
      },
      data: {
        ...(data.password !== "" && { password: data.password }),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });
    // revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteStudent = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    // User creation handled above

    await prisma.student.delete({
      where: {
        id: id,
      },
    });

    // revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createExam = async (
  currentState: CurrentState,
  data: ExamSchema
) => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    if (role === "teacher") {
      const teacherLesson = await prisma.lesson.findFirst({
        where: {
          teacherId: userId!,
          id: data.lessonId,
        },
      });

      if (!teacherLesson) {
        return { success: false, error: true };
      }
    }

    await prisma.exam.create({
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateExam = async (
  currentState: CurrentState,
  data: ExamSchema
) => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    if (role === "teacher") {
      const teacherLesson = await prisma.lesson.findFirst({
        where: {
          teacherId: userId!,
          id: data.lessonId,
        },
      });

      if (!teacherLesson) {
        return { success: false, error: true };
      }
    }

    await prisma.exam.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteExam = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;

  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    await prisma.exam.delete({
      where: {
        id: id,
        ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {}),
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};
export const createTransport = async (
  currentState: CurrentState,
  data: any
) => {
  try {
    await prisma.transport.create({
      data: {
        route: data.route,
        busNo: data.busNo,
        driver: data.driver,
        phone: data.phone,
        capacity: parseInt(data.capacity),
        status: data.status || "IDLE",
      },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteTransport = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.transport.delete({
      where: { id: id },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createStudyMaterial = async (
  currentState: CurrentState,
  data: any
) => {
  try {
    await prisma.studyMaterial.create({
      data: {
        title: data.title,
        type: data.type,
        url: data.url,
        subjectId: data.subjectId,
        teacherId: data.teacherId,
      },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteStudyMaterial = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.studyMaterial.delete({
      where: { id: id },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};
export const createParent = async (
  currentState: CurrentState,
  data: any
) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password || "123123", 10);
    const user = await prisma.user.create({
      data: {
        username: data.username,
        password: hashedPassword,
        role: "PARENT",
      },
    });

    await prisma.parent.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone,
        address: data.address,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createStaff = async (
  currentState: CurrentState,
  data: any
) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password || "123123", 10);
    const user = await prisma.user.create({
      data: {
        username: data.username,
        password: hashedPassword,
        role: data.role.toUpperCase(),
      },
    });

    await prisma.staff.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        role: data.role,
        birthday: new Date(data.birthday),
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};
export const deleteParent = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.parent.delete({
      where: { id: id },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteStaff = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.staff.delete({
      where: { id: id },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

// NEW ACTIONS

export const deleteLesson = async (currentState: CurrentState, data: FormData) => {
  const id = data.get("id") as string;
  try {
    await prisma.lesson.delete({ where: { id: id } });
    return { success: true, error: false };
  } catch (err) { return { success: false, error: true }; }
};

export const createAssignment = async (
  currentState: CurrentState,
  data: any
) => {
  try {
    await prisma.assignment.create({
      data: {
        title: data.title,
        startDate: new Date(data.startDate),
        dueDate: new Date(data.dueDate),
        lessonId: data.lessonId,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateAssignment = async (
  currentState: CurrentState,
  data: any
) => {
  try {
    await prisma.assignment.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        startDate: new Date(data.startDate),
        dueDate: new Date(data.dueDate),
        lessonId: data.lessonId,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteAssignment = async (currentState: CurrentState, data: FormData) => {
  const id = data.get("id") as string;
  try {
    await prisma.assignment.delete({ where: { id: id } });
    return { success: true, error: false };
  } catch (err) { return { success: false, error: true }; }
};

export const deleteResult = async (currentState: CurrentState, data: FormData) => {
  const id = data.get("id") as string;
  try {
    await prisma.result.delete({ where: { id: id } });
    return { success: true, error: false };
  } catch (err) { return { success: false, error: true }; }
};

export const createAttendance = async (
  currentState: CurrentState,
  data: any
) => {
  try {
    await prisma.attendance.create({
      data: {
        date: new Date(data.date),
        present: data.present === "true" || data.present === true,
        studentId: data.studentId,
        lessonId: data.lessonId,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateAttendance = async (
  currentState: CurrentState,
  data: any
) => {
  try {
    await prisma.attendance.update({
      where: {
        id: data.id,
      },
      data: {
        date: new Date(data.date),
        present: data.present === "true" || data.present === true,
        studentId: data.studentId,
        lessonId: data.lessonId,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteAttendance = async (currentState: CurrentState, data: FormData) => {
  const id = data.get("id") as string;
  try {
    await prisma.attendance.delete({ where: { id: id } });
    return { success: true, error: false };
  } catch (err) { return { success: false, error: true }; }
};

export const deleteEvent = async (currentState: CurrentState, data: FormData) => {
  const id = data.get("id") as string;
  try {
    await prisma.event.delete({ where: { id: id } });
    return { success: true, error: false };
  } catch (err) { return { success: false, error: true }; }
};

export const deleteAnnouncement = async (currentState: CurrentState, data: FormData) => {
  const id = data.get("id") as string;
  try {
    await prisma.announcement.delete({ where: { id: id } });
    return { success: true, error: false };
  } catch (err) { return { success: false, error: true }; }
};

export const deleteBook = async (currentState: CurrentState, data: FormData) => {
  const id = data.get("id") as string;
  try {
    await prisma.book.delete({ where: { id: id } });
    return { success: true, error: false };
  } catch (err) { return { success: false, error: true }; }
};

export const createBook = async (currentState: CurrentState, data: any) => {
  try {
    await prisma.book.create({
      data: {
        title: data.title,
        author: data.author,
        isbn: data.isbn,
        category: data.category || "General",
        totalCopies: parseInt(data.totalCopies) || 1,
        availableCopies: parseInt(data.totalCopies) || 1,
      }
    });
    return { success: true, error: false };
  } catch (err) { return { success: false, error: true }; }
};

export const createEvent = async (currentState: CurrentState, data: any) => {
  try {
    await prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        classId: data.classId ? data.classId : null,
      }
    });
    return { success: true, error: false };
  } catch (err) { return { success: false, error: true }; }
};

export const createAnnouncement = async (currentState: CurrentState, data: any) => {
  try {
    await prisma.announcement.create({
      data: {
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        classId: data.classId ? data.classId : null,
      }
    });
    return { success: true, error: false };
  } catch (err) { return { success: false, error: true }; }
};

export const createBookIssue = async (
  currentState: CurrentState,
  data: any
) => {
  try {
    await prisma.bookIssue.create({
      data: {
        bookId: data.bookId,
        studentId: data.studentId,
        dueDate: new Date(data.dueDate),
        status: "ISSUED",
      },
    });

    await prisma.book.update({
      where: { id: data.bookId },
      data: {
        availableCopies: {
          decrement: 1,
        },
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteBookIssue = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    const issue = await prisma.bookIssue.findUnique({
      where: { id: id },
    });
    if (issue && issue.status === "ISSUED") {
      await prisma.book.update({
        where: { id: issue.bookId },
        data: { availableCopies: { increment: 1 } },
      });
    }
    await prisma.bookIssue.delete({ where: { id: id } });
    return { success: true, error: false };
  } catch (err) {
    return { success: false, error: true };
  }
};

export const returnBookIssue = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    const issue = await prisma.bookIssue.findUnique({
      where: { id: id },
    });
    if (issue && issue.status === "ISSUED") {
      await prisma.book.update({
        where: { id: issue.bookId },
        data: { availableCopies: { increment: 1 } },
      });
      await prisma.bookIssue.update({
        where: { id: id },
        data: { status: "RETURNED", returnDate: new Date() },
      });
    }
    return { success: true, error: false };
  } catch (err) {
    return { success: false, error: true };
  }
};

export const createFeePayment = async (
  currentState: CurrentState,
  data: any
) => {
  try {
    await prisma.feePayment.create({
      data: {
        studentId: data.studentId,
        categoryId: data.categoryId,
        amountPaid: parseInt(data.amountPaid),
        paymentMethod: data.paymentMethod,
        status: data.status || "PENDING",
      },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateFeePayment = async (
  currentState: CurrentState,
  data: any
) => {
  try {
    await prisma.feePayment.update({
      where: { id: data.id },
      data: {
        studentId: data.studentId,
        categoryId: data.categoryId,
        amountPaid: parseInt(data.amountPaid),
        paymentMethod: data.paymentMethod,
        status: data.status,
      },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteFeePayment = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.feePayment.delete({ where: { id: id } });
    return { success: true, error: false };
  } catch (err) {
    return { success: false, error: true };
  }
};

export const updateBook = async (currentState: CurrentState, data: any) => {
  try {
    await prisma.book.update({
      where: { id: data.id },
      data: {
        title: data.title,
        author: data.author,
        isbn: data.isbn,
        category: data.category,
        totalCopies: parseInt(data.totalCopies),
        availableCopies: parseInt(data.availableCopies),
      },
    });
    return { success: true, error: false };
  } catch (err) {
    return { success: false, error: true };
  }
};

// --- RAZORPAY ACTIONS ---

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const createRazorpayOrder = async (amount: number, feePaymentId: string) => {
  try {
    const options = {
      amount: Math.round(amount * 100), // amount in paise
      currency: "INR",
      receipt: `receipt_${feePaymentId}`,
    };

    const order = await razorpay.orders.create(options);
    return { success: true, order };
  } catch (err) {
    console.error("Razorpay Order Error:", err);
    return { success: false, error: "Failed to create order" };
  }
};

export const verifyRazorpayPayment = async (
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string,
  feePaymentId: string
) => {
  try {
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      await prisma.feePayment.update({
        where: { id: feePaymentId },
        data: {
          status: "PAID",
          paymentDate: new Date(),
          paymentMethod: "RAZORPAY",
        },
      });
      revalidatePath("/list/finance");
      return { success: true };
    } else {
      return { success: false, error: "Signature verification failed" };
    }
  } catch (err) {
    console.error("Razorpay Verification Error:", err);
    return { success: false, error: "Verification failed" };
  }
};

export const sendMessage = async (receiverId: string, content: string) => {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Not authenticated" };

  try {
    const message = await prisma.message.create({
      data: {
        senderId: userId,
        receiverId,
        content,
      },
    });
    return { success: true, message };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to send message" };
  }
};

export const getMessages = async (otherId: string) => {
  const { userId } = await auth();
  if (!userId) return [];

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: otherId },
          { senderId: otherId, receiverId: userId },
        ],
      },
      orderBy: { createdAt: "asc" },
    });
    return messages;
  } catch (err) {
    console.error(err);
    return [];
  }
};
