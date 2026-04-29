import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function initRS() {
  try {
    const result = await prisma.$runCommandRaw({ replSetInitiate: {} });
    console.log("Replica Set Initiated via Prisma:", result);
  } catch (err: any) {
    if (err.message.includes("already initialized")) {
      console.log("Replica set is already initialized.");
    } else {
      console.error("Error initiating replica set:", err.message);
    }
  } finally {
    await prisma.$disconnect();
  }
}

initRS();
