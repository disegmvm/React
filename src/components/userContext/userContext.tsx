import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

type UserContextType = {
  userName: string | null;
  isAuthorized: boolean;
  login: () => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType>({
  userName: null,
  isAuthorized: false,
  login: () => {},
  logout: () => {},
});


export const UserProvider = ({ children }: PropsWithChildren) => {
  const [userName, setUserName] = useState<string | null>(null);

  const login = () => {
    setUserName("Денис");
  };

  const logout = () => {
    setUserName(null);
  };

  return (
    <UserContext.Provider
      value={{
        userName,
        isAuthorized: userName !== null,
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