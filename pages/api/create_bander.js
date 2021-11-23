import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function dataBander(req, res) {
  const {data} = JSON.parse(req.body)
  console.log(data)
  
  if (data.id) {
    const banders = await prisma.bander.update({ data:data, where:{id:req.data.id} });

  } else {
    const banders = await prisma.bander.create({ data: data });

  }
  res.json(200);
}
