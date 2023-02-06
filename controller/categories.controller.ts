import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    let category: Prisma.categoriesCreateInput;
    category = {
      name: name,
    };
    const createCategory = await prisma.categories.create({ data: category });
    if(!createCategory) {
        res.status(400).send({ msg: 'Something was wrong, please try again' })
    }
    res.status(200).send({ msg: "Success", createCategory })
  } catch (error) {
    res.status(500).send({ msg: "Error, try again" });
  }
};
