import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getUsers, createUser, updateUser, deleteUser, User } from '../services/userService';
import { UserContext } from '../context/UserContext';
import { useContext, useState } from 'react';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  birthDate: z.string().min(10, 'Data de nascimento é obrigatória'),
});

export function useUserActions() {
  const context = useContext(UserContext);
  
 
  if (!context) {
    throw new Error('UserContext must be used within a UserProvider');
  }

  const { users, setUsers, userToEdit, setUserToEdit } = context;
  const [editName, setEditName] = useState<string>('');
  const [editEmail, setEditEmail] = useState<string>('');
  const [editBirthDate, setEditBirthDate] = useState<string>('');
  const queryClient = useQueryClient();

  useQuery('users', getUsers, {
    onSuccess: (data) => {
      setUsers(data);
    },
  });

  const createUserMutation = useMutation(
    (newUser: { name: string; email: string; birthDate: string }) => createUser(newUser),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      },
    }
  );

  const updateUserMutation = useMutation(
    (user: User) => updateUser(user.id, user.name, user.email, user.birthDate),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      },
    }
  );

  const deleteUserMutation = useMutation(
    (id: string) => deleteUser(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      },
    }
  );

  const handleEditUser = (user: User | null) => {
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
  };

  const validateUserData = (data: { name: string; email: string; birthDate: string }) => {
    try {
      userSchema.parse(data);
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        return e.errors.map((err) => err.message);
      }
      return [];
    }
  };

  return {
    users,
    userToEdit,
    createUserMutation,
    updateUserMutation,
    deleteUserMutation,
    handleEditUser,
    validateUserData,
    editName,
    setEditName,
    editEmail,
    setEditEmail,
    editBirthDate,
    setEditBirthDate,
  };
}



