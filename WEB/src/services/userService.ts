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
  } catch (error: any) {
    console.error('Erro ao buscar todos os usuários:', error);
    return [];
  }
}

export async function createUser({
  name,
  email,
  birthDate,
}: {
  name: string;
  email: string;
  birthDate: string;
}): Promise<{ name: string; email: string; birthDate: string }> {
  try {
    const birthDateISO = dayjs(birthDate).toISOString();
    const response = await api.post('/users', {
      name,
      email,
      birthDate: birthDateISO,
    });

    alert('Usuário cadastrado com sucesso!');
    return response.data; 
  } catch (error: any) {
    console.error('Erro ao cadastrar usuário:', error);
    alert('Falha ao cadastrar usuário. Tente novamente.');
    throw error; 
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
    return Array.isArray(response.data) ? response.data[0] || null : response.data;
  } catch (error: any) {
    console.error('Erro ao buscar usuário:', error);
    return null;
  }
}

export async function updateUser(id: string, name: string, email: string, birthDate: string): Promise<void> {
  try {
    const birthDateISO = dayjs(birthDate).toISOString();
    await api.put(`/users/${id}`, { name, email, birthDate: birthDateISO });
    alert('Usuário atualizado com sucesso!');
  } catch (error: any) {
    console.error('Erro ao atualizar usuário:', error);
    alert('Falha ao atualizar usuário. Tente novamente.');
  }
}

export async function deleteUser(id: string): Promise<void> {
  try {
    await api.delete(`/users/${id}`);
    alert('Usuário excluído com sucesso!');
  } catch (error: any) {
    console.error('Erro ao excluir usuário:', error);
    alert('Falha ao excluir usuário. Tente novamente.');
  }
}
