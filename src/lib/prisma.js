import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient({ log: ["info"] });
};

const globalForPrisma = global;

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prismaClientSingleton();
}

export default globalForPrisma.prisma;
