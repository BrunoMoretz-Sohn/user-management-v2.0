import api from '../services/api';
import dayjs from 'dayjs';

export interface User {
  id: string;
  name: string;
  email: string;
  birthDate: string;
}

export async function getUsers(): Promise<User[]> {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar todos os usuários:', error);
    return [];
  }
}

export async function createUser(name: string, email: string, birthDate: string): Promise<void> {
  try {
    const birthDateISO = dayjs(birthDate).toISOString();
    await api.post('/users', { name, email, birthDate: birthDateISO });
    alert('Usuário cadastrado com sucesso!');
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
  }
}

export async function getUser(param: string): Promise<User | null> {
  try {
    const url = param.includes('@')
      ? `/search?email=${encodeURIComponent(param)}`
      : /^[a-fA-F0-9]{24}$/.test(param)
      ? `/users/${encodeURIComponent(param)}`
      : `/search?name=${encodeURIComponent(param)}`;

    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return null;
  }
}

export async function updateUser(id: string, name: string, email: string, birthDate: string): Promise<void> {
  try {
    const birthDateISO = dayjs(birthDate).toISOString();
    await api.put(`/users/${id}`, { name, email, birthDate: birthDateISO });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
  }
}

export async function deleteUser(id: string): Promise<void> {
  try {
    await api.delete(`/users/${id}`);
    alert('Exclusão efetuada com sucesso!');
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
  }
}
