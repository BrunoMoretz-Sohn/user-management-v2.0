import { Request, Response } from 'express';
import prisma from '../prisma';  

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {

    await prisma.user.delete({
      where: {
        id: req.params.id, 
      },
    });

    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (error) {

    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
};
