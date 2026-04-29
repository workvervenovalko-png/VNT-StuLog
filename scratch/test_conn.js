const { PrismaClient } = require("@prisma/client");

async function check() {
  const prisma = new PrismaClient();
  try {
    await prisma.$connect();
    console.log("SUCCESS: Connected to database");
    const userCount = await prisma.user.count();
    console.log("User count:", userCount);
    const users = await prisma.user.findMany({ take: 5 });
    console.log("Sample users:", users.map(u => u.username));
  } catch (e) {
    console.error("FAILURE: Could not connect to database");
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

check();
