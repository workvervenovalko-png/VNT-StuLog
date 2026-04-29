-- CreateTable
CREATE TABLE "Transport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "route" TEXT NOT NULL,
    "busNo" TEXT NOT NULL,
    "driver" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'IDLE',
    "capacity" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "StudyMaterial" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subjectId" INTEGER NOT NULL,
    "teacherId" TEXT NOT NULL,
    CONSTRAINT "StudyMaterial_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StudyMaterial_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Payroll" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "staffId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "month" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "paymentDate" DATETIME,
    CONSTRAINT "Payroll_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isRead" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "SmartClass" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "classId" INTEGER NOT NULL,
    "teacherId" TEXT NOT NULL,
    CONSTRAINT "SmartClass_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SmartClass_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Transport_busNo_key" ON "Transport"("busNo");
