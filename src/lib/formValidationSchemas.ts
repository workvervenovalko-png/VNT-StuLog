import { z } from "zod";

export const subjectSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Subject name is required!" }),
  teachers: z.array(z.string()), 
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Subject name is required!" }),
  capacity: z.coerce.number().min(1, { message: "Capacity name is required!" }),
  gradeId: z.string().min(1, { message: "Grade name is required!" }),
  supervisorId: z.coerce.string().optional(),
});

export type ClassSchema = z.infer<typeof classSchema>;

export const teacherSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  subjects: z.array(z.string()).optional(), 
});

export type TeacherSchema = z.infer<typeof teacherSchema>;

export const studentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  gradeId: z.string().min(1, { message: "Grade is required!" }),
  classId: z.string().min(1, { message: "Class is required!" }),
  parentId: z.string().min(1, { message: "Parent Id is required!" }),
});

export type StudentSchema = z.infer<typeof studentSchema>;

export const examSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Title name is required!" }),
  startTime: z.coerce.date({ message: "Start time is required!" }),
  endTime: z.coerce.date({ message: "End time is required!" }),
  lessonId: z.string().min(1, { message: "Lesson is required!" }),
});

export type ExamSchema = z.infer<typeof examSchema>;
export const parentSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(3).max(20),
  password: z.string().min(8).optional().or(z.literal("")),
  name: z.string().min(1),
  surname: z.string().min(1),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(1),
  address: z.string().min(1),
});

export type ParentSchema = z.infer<typeof parentSchema>;

export const staffSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(3).max(20),
  password: z.string().min(8).optional().or(z.literal("")),
  name: z.string().min(1),
  surname: z.string().min(1),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().min(1),
  role: z.string().min(1),
  birthday: z.coerce.date(),
});

export type StaffSchema = z.infer<typeof staffSchema>;
 
export const attendanceSchema = z.object({
  id: z.string().optional(),
  date: z.coerce.date({ message: "Date is required!" }),
  present: z.coerce.boolean({ message: "Status is required!" }),
  studentId: z.string().min(1, { message: "Student is required!" }),
  lessonId: z.string().min(1, { message: "Lesson is required!" }),
});

export type AttendanceSchema = z.infer<typeof attendanceSchema>;

export const assignmentSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Title is required!" }),
  startDate: z.coerce.date({ message: "Start date is required!" }),
  dueDate: z.coerce.date({ message: "Due date is required!" }),
  lessonId: z.string().min(1, { message: "Lesson is required!" }),
});

export type AssignmentSchema = z.infer<typeof assignmentSchema>;

export const studyMaterialSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Title is required!" }),
  type: z.string().min(1, { message: "Type is required!" }),
  url: z.string().url({ message: "Invalid URL!" }),
  subjectId: z.string().min(1, { message: "Subject is required!" }),
  teacherId: z.string().min(1, { message: "Teacher is required!" }),
});

export type StudyMaterialSchema = z.infer<typeof studyMaterialSchema>;

export const bookSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Title is required!" }),
  author: z.string().min(1, { message: "Author is required!" }),
  isbn: z.string().min(1, { message: "ISBN is required!" }),
  category: z.string().optional(),
  totalCopies: z.coerce.number().min(1, { message: "Total copies is required!" }),
});

export type BookSchema = z.infer<typeof bookSchema>;
