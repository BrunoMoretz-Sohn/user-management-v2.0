import { Request, Response } from 'express';
import prisma from '../prisma';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, birthDate } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      res.status(400).json({ error: 'E-mail já cadastrado' });
      return; 
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        birthDate,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};



