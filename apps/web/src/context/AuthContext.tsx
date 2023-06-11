import {
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Importa la instancia de autenticación de firebaseApp.ts

interface AuthContextType {
  auth: User | null;
  loginAuth: (auth: User) => void;
  logoutAuth: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  auth: null,
  loginAuth: () => {},
  logoutAuth: () => {},
});

export const useAuth = (): AuthContextType => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authInstance, setAuthInstance] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthInstance(user);
      } else {
        setAuthInstance(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // ...

  const loginAuth = (user: User): void => {
    setAuthInstance(user);
  };

  const logoutAuth = (): void => {
    setAuthInstance(null);
  };

  const authContextValue: AuthContextType = {
    auth: authInstance,
    loginAuth,
    logoutAuth,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const authStateChanged = (setUser, setIsLoading) => {
  const unsubscribeAuth = onAuthStateChanged(auth, (authenticatedUser) => {
    authenticatedUser ? setUser(authenticatedUser) : setUser(null);
    setIsLoading(false);
  });

  return unsubscribeAuth;
};

export const loginWithEmailAndPassword = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Usuario autenticado:', user);
    })
    .catch((error) => {
      console.log('Error en inicio de sesión:', error);
    });
};

export const logout = () => {
  signOut(auth)
    .then(() => {
      console.log('Cierre de sesión exitoso');
    })
    .catch((error) => {
      console.log('Error en cierre de sesión:', error);
    });
};
