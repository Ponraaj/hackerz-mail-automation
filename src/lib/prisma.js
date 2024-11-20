import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const globalForPrisma = global.prisma || prismaClientSingleton();

export const prisma = globalForPrisma;

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
