import { useState, useCallback } from 'react';
import { getUsers, createUser, getUser, updateUser, deleteUser, User } from '../services/userService';

export function useUserActions() {
  const [users, setUsers] = useState<User[]>([]);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [editName, setEditName] = useState<string>('');
  const [editEmail, setEditEmail] = useState<string>('');
  const [editBirthDate, setEditBirthDate] = useState<string>('');

  const fetchUsers = useCallback(async () => {
    try {
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  }, []);

  const handleCreateUser = useCallback(async (name: string, email: string, birthDate: string) => {
    try {
      await createUser(name, email, birthDate);
      fetchUsers();  // Recarregar a lista de usuários após criar um novo
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  }, [fetchUsers]);

  const handleGetUser = useCallback(async (searchParam: string) => {
    try {
      const user = await getUser(searchParam);
      if (user) {
        setUsers([user]);
        setUserToEdit(user);
        setEditName(user.name);
        setEditEmail(user.email);
        setEditBirthDate(user.birthDate);
      } else {
        setUsers([]);
        setUserToEdit(null);
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
    }
  }, []);

  const handleUpdateUser = useCallback(async () => {
    if (userToEdit) {
      try {
        await updateUser(userToEdit.id, editName, editEmail, editBirthDate);
        fetchUsers();
        setUserToEdit(null);
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
      }
    }
  }, [userToEdit, editName, editEmail, editBirthDate, fetchUsers]);

  const handleEditUser = useCallback((user: User | null) => {
    setUserToEdit(user);
    if (user) {
      setEditName(user.name);
      setEditEmail(user.email);
      setEditBirthDate(user.birthDate);
    } else {
      setEditName('');
      setEditEmail('');
      setEditBirthDate('');
    }
  }, []);

  const handleDeleteUser = useCallback(async (id: string) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  }, [fetchUsers]);

  return {
    users,
    userToEdit,
    editName,
    setEditName,
    editEmail,
    setEditEmail,
    editBirthDate,
    setEditBirthDate,
    fetchUsers,
    handleCreateUser,
    handleGetUser,
    handleUpdateUser,
    handleEditUser,
    handleDeleteUser,
  };
}
