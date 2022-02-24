import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getBanders(req, res) {
  const id =   (JSON.parse(req.body)).id;
  const bander = await prisma.bander.findFirst({
    where: { id },
    include: {
      session_chaired: true,
      evaluations_participated: true,
      sessions_evaluated: {include:{evaluation:{include:{bander:true}}}}
    }
  });
  res.json(bander);
}
