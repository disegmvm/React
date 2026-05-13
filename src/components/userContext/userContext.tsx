import {
  createContext,
  useContext,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";

type UserContextType = {
  userId: string | null;
  userName: string | null;
  isAuthorized: boolean;
  login: VoidFunction;
  logout: VoidFunction;
};

type User = {
  id: string;
  name: string;
};

const UserContext = createContext<UserContextType>({
  userId: null,
  userName: null,
  isAuthorized: false,
  login: () => {},
  logout: () => {},
});

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login: VoidFunction = () => {
    setUser({
      id: "user-den",
      name: "Den",
    });
  };

  const logout: VoidFunction = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        userId: user?.id ?? null,
        userName: user?.name ?? null,
        isAuthorized: user !== null,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
