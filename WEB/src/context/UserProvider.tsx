import React, { useState, useCallback, ReactNode } from 'react';
import { UserContext } from './UserContext';
import { User } from '@types';

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const updateUsers = useCallback((newUsers: User[]) => {
    setUsers(newUsers);
  }, []);

  const updateUserToEdit = useCallback((user: User | null) => {
    setUserToEdit(user);
  }, []);

  return (
    <UserContext.Provider value={{ users, setUsers: updateUsers, userToEdit, setUserToEdit: updateUserToEdit }}>
      {children}
    </UserContext.Provider>
  );
};


