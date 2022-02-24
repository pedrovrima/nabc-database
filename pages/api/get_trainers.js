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
        {max_raptors: "Trainer"},
        {max_passerines: "Trainer"},
        {max_hummingbirds: "Trainer"},
        {max_waterfowl: "Trainer"},
        {max_shorebirds: "Trainer"},
      ]
    };
    return where;
  }
};

export default async function getTrainers(req, res) {
  const where = createWhere();
  const trainers = await prisma.bander.findMany({ where:where });
  res.json(trainers);
}
