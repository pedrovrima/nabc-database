import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function dataBander(req, res) {
  // const {id,data} =req.body
try{
  const { type, data, id } = JSON.parse(req.body);

  if (type === "update") {
    console.log(data);
    if (data.session) {
      const session = await prisma.session.update({
        data: data.session,
        where: { id: id },
      });
    }

    if (data.evaluation.create.length > 0) {

      const creations = data.evaluation.update.map((crt) => {
        return prisma.evaluation.create({ data: crt });
      });
      await prisma.$transaction(creations);
    }

    if (data.evaluation.update.length > 0) {
      const updates = data.evaluation.update.map((upd) => {
        console.log(upd.data.bander);
        return prisma.evaluation.update({ data: upd.data, where: upd.where });
      });
      await prisma.$transaction(updates);
    }

    if (data.evaluator.delete.length > 0) {
      const deletions = data.evaluator.delete.map((del) =>
        prisma.evaluator.delete({
          where: { ...del },
        })
      );
      await prisma.$transaction(deletions);
    }

    if (data.evaluator.create.length > 0) {
      await prisma.evaluator.createMany({
        data: data.evaluator.create,
      });
    }

    if (data.trap?.delete.length > 0) {
      const deletions = data.trap.delete.map((del) =>
        prisma.evaluationTraps.delete({
          where: { ...del },
        })
      );

      await prisma.$transaction(deletions);
    }

    if (data.trap?.create.length > 0) {
      await prisma.evaluationTraps.createMany({
        data: data.trap.create,
      });
    }

    if (data.evaluation.delete.length > 0) {
      const deletions = data.evaluation.delete.map((del) => {
        return prisma.evaluation.delete({
          where: { id: del },
        });
      });
      await prisma.$transaction(deletions);
    }
  } else {
    const session = await prisma.session.create({ data: data });
  }

  res.json(200);}
  catch (err) {
    console.log(err)
    res.json(500)
  }
}

