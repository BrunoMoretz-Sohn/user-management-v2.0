import { Request, Response } from 'express';
import prisma from '../prisma';  

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        birthDate: req.body.birthDate,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};


