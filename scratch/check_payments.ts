import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function checkPayments() {
  const payments = await prisma.feePayment.findMany({
    include: {
      student: { select: { name: true, surname: true, parentId: true } },
      category: { select: { name: true } },
    },
  });
  console.log("Total Payments:", payments.length);
  console.log("Payments Details:", JSON.stringify(payments, null, 2));
  await prisma.$disconnect();
}

checkPayments();
