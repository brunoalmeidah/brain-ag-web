import React, {
  createContext,
  ReactElement,
  useCallback,
  useState,
} from "react";
import { authenticate, User } from "@/api/auth";

interface IComponenProps {
  children: ReactElement | ReactElement[];
}
interface AuthState {
  user: User;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextState {
  user: User;
  signIn(data: SignInCredentials): Promise<User>;
  signOut(): void;
}

const AuthContext = createContext({} as AuthContextState);

const AuthProvider: React.FC<IComponenProps> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem("@brainag:user");
    const token = localStorage.getItem("@brainag:token");

    if (user && token) {
      return { token, user: JSON.parse(user) as User };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials): Promise<User> => {
      const { token, user } = await authenticate({ email, password });
      localStorage.setItem("@brainag:user", JSON.stringify(user));
      localStorage.setItem("@brainag:token", token);
      setData({ user, token });
      return user;
    },
    []
  );

  const signOut = useCallback(() => {
    localStorage.removeItem("@brainag:user");
    localStorage.removeItem("@brainag:token");
    setData({} as AuthState);
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
