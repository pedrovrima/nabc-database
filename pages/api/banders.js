import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function getBanders(req, res) {
  console.log("fetch")
  const banders = await prisma.bander.findMany();
  res.json(banders);
}
