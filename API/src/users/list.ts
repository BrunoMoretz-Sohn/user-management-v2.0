import { Request, Response } from 'express';
import prisma from '../prisma';  

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    
    if (!users || users.length === 0) {
      res.status(404).json({ message: 'Nenhum usuário encontrado.' });
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar usuários', details: error });
  }
};

export const getUserById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id: id, 
      },
    });

    if (!user) {
      res.status(404).json({ error: 'Usuário não encontrado' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário', details: error });
  }
};


export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email } = req.query;

 
    const whereConditions: {
      name?: { contains: string, mode: 'insensitive' };
      email?: string;
    } = {};


    if (name) {
      whereConditions.name = { 
        contains: name as string, 
        mode: 'insensitive' 
      };
    }
    

    if (email) {
      whereConditions.email = email as string; 
    }

 
    const users = await prisma.user.findMany({
      where: whereConditions,
    });


    if (users.length === 0) {
      res.status(404).json({ error: 'Usuário não encontrado' });
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário', details: error });
  }
};
