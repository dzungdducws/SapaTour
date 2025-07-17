import { createContext, useState } from 'react';

type User = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
};

export type UserContextType = {
  user: User | null;
  setUser?: (user: User | null) => void;
  login?: (email: any, pass: any) => void;
  logout?: () => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: (user: User | null) => {},
  login: (email: any, pass: any) => {},
  logout: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: any, pass: any) => {

    setUser({
      name: email,
      password: pass,
      email,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
