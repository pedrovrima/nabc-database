import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function getBanders(req, res) {
  const banders = await prisma.bander.findMany();
  res.json(banders);
}
