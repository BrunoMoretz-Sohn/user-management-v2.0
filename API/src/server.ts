import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createUser } from './users/create';
import { updateUser } from './users/update';
import { deleteUser } from './users/delete';
import { getAllUsers, getUserById, getUser } from './users/list';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);
app.get('/users', getAllUsers);
app.get('/users/:id', getUserById);
app.get('/search', getUser);


const port: number = Number(process.env.PORT) || 3000; 
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
