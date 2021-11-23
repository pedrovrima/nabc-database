import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createWhere = (taxa) => {
  let where = {};
  if (taxa) {
    where = { ["max_" + taxa.toLowerCase()]: "Trainer" };
    return where;
  } else {
    where = {
      OR: [
        {max_raptor: "Trainer"},
        {max_passerine: "Trainer"},
        {max_humminbird: "Trainer"},
        {max_waterfowl: "Trainer"},
        {max_shorebird: "Trainer"},
      ]
    };
    return where;
  }
};

export default async function getTrainers(req, res) {
  const where = createWhere();
    console.log(where)
  const trainers = await prisma.bander.findMany({ where:where });
  console.log(trainers)
  res.json(trainers);
}
