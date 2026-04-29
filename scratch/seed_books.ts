import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seedBooks() {
  const books = await prisma.book.findMany();
  console.log("Total Books:", books.length);
  if (books.length === 0) {
    await prisma.book.create({
      data: {
        title: "Introduction to Algorithms",
        author: "Cormen",
        isbn: "978-0262033848",
        category: "Computer Science",
        totalCopies: 5,
        availableCopies: 5,
      },
    });
    console.log("Seeded test book.");
  }
  await prisma.$disconnect();
}

seedBooks();
