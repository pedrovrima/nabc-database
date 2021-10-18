import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function getSessions(req, res) {
  console.log("fetch")
  const sessions = await prisma.session.findMany();
  res.json(sessions);
}
