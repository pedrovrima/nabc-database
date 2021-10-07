import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function getBanders(req, res) {

  const bander = await prisma.bander.findFirst({where:{ìd:req.id},include:{session_chaired:true,evaluations_participated:true,sessions_evaluated:true}});
  res.json(bander);
}
