import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function dataBander(req, res) {
  const {id,data} = JSON.parse(req.body)
  
  if (id) {
    const banders = await prisma.bander.update({ data:data, where:{id} });

  } else {
    const banders = await prisma.bander.create({ data: data });

  }
  res.json(200);
}
