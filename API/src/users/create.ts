import { Request, Response } from 'express';
import prisma from '../prisma';  

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        birthDate: req.body.birthDate,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

