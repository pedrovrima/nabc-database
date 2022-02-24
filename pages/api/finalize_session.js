import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createCondition = (result, level) => {
    console.log(result,level)
  if (result === "Approved" && level === "Trainer") {
    return () => true;
  }
  if (result === "Rejected") {
    return () => false;
  }
  if (result === "Approved" && level === "Bander") {
    return (current_level) =>
      current_level ? !["Trainer"].includes(current_level) : true;
  }
  if (result === "Assistant" || (result === "Approved" && level === "Assistant")) {
    return (current_level) =>
      current_level ? !["Trainer", "Bander"].includes(current_level) : true;
  }
};

const createTaxa = (taxa) => {
  return `max_${taxa.toLowerCase()}`;
};

const updateBanders = (data) => {
  return data.reduce((ct, datum) => {
    const condition = createCondition(datum.final_result, datum.level);
    const banderLevel = datum.bander[createTaxa(datum.taxa)];
    const oldLevel = ct.filter(cts=>cts.where?.id === datum.bander.id)[0]?.data[createTaxa(datum.taxa)]

    console.log(banderLevel,oldLevel,condition);
    if (condition(banderLevel) && condition(oldLevel)) {
      return [
        ...ct,
        {
          where: { id: datum.bander.id },
          data: {
            [createTaxa(datum.taxa)]:
              datum.result === "Assistant" ? "Assistant" : datum.level,
          },
        },
      ];
    } else {
      return ct;
    }
  }, []);
};

export default async function finalizeSession(req, res) {
  const { session_id, data } = JSON.parse(req.body);
  console.log(session_id, data);
  try {
    const finalize = prisma.session.update({
      where: { id: session_id },
      data: { finalized: true },
    });
    const evaluations = data.map((datum) =>
      prisma.evaluation.update({ where: {id:datum.id}, data: { final_result:datum.final_result,written_score:datum.written_score,notes:datum.notes } })
    );

    const banderData = updateBanders(data);

    const updateUser = banderData.map((datum) => {
      return prisma.bander.update({ ...datum });
    });

    console.log(updateUser);

    await prisma.$transaction([finalize, ...evaluations, ...updateUser]);
  } catch (err) {
    console.log(err);
    res.send(500)
  }
}
