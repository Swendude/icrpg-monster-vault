import { PrismaClient } from "@prisma/client";
import { actions, chunks } from "./seed_data";

const prisma = new PrismaClient();

const seed = async () => {
  for (let chunk of chunks) {
    await prisma.chunk.create({ data: chunk });
  }
  console.log("Seeded Chunks");
  for (let action of actions) {
    await prisma.action.create({ data: action });
  }
  console.log("Seeded Actions");
};

seed();
