import { createContext, ReactNode, useState } from 'react';
import { User } from '@types';

interface UserContextType {
  users: User[];
  setUsers: (users: User[]) => void;
  userToEdit: User | null;
  setUserToEdit: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ users, setUsers, userToEdit, setUserToEdit }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };

