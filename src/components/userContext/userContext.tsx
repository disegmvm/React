import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

type UserContextType = {
  userId: string | null;
  userName: string | null;
  isAuthorized: boolean;
  login: () => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType>({
  userId: null,
  userName: null,
  isAuthorized: false,
  login: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);

  const login = () => {
    setUser({
      id: "user-den",
      name: "Den",
    });
  };

  const logout = () => {
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
