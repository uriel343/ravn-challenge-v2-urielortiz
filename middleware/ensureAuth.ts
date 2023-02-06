import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies["accessToken"];

    const payload: any = verify(accessToken, "access_secret");

    if (!payload) {
      return res.status(401).send({ msg: "Unauthenticated" });
    }

    const user = await prisma.users.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      return res.status(401).send({ msg: "Unauthenticated" });
    }

    next();
  } catch (error) {
    return res.status(401).send({ msg: "Unauthenticated" });
  }
};
