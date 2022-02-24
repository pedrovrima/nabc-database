import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getSessions(req, res) {
  const id =   (JSON.parse(req.body)).id;
  const session = await prisma.session.findFirst({
    where: { id },
    include: {
      chair: true,
      evaluations: {include:{bander:true,trapping_methods:true,evaluators:{include:{bander:true}}}},
      
     }
  });

  res.json(session);
}
