import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.users.findMany();

    res.json({ msg: "Get Usuarios", allUsers });
  } catch (error) {
    res.json({ msg: "Internal error" });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const role = "Client";

  try {
    if (!name || !email || !password) {
      console.log(name, email, password);
      res.json({
        msg: "Incomplete params",
      });
    }

    const userRegistered = await prisma.users.create({
      data: {
        name: name,
        role: role,
        email: email,
        password: await bcrypt.hash(password, 12),
      },
    });

    res.json({
      msg: "postUsuario",
      userRegistered,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: "Internal error",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({ msg: "Incomplete params" });
  }

  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    let passwordVerified = bcrypt.compare(password, user?.password!);
    if (!user || !passwordVerified) {
      res.status(404).send({
        msg: "Invalid credentials",
      });
    }

    const accessToken = sign(
      {
        id: user?.id!,
      },
      "access_secret",
      { expiresIn: "10s" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, //1 day
    });

    res.status(200).send({ msg: "User authenticated" });
  } catch (error) {
    res.status(500).send({ msg: "Internal error" });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  res.cookie("accessToken", "", { maxAge: 0 });

  res.send({ msg: "Success" });
};
