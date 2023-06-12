import { useState, useEffect, createContext } from "react";

import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { setDoc, doc } from 'firebase/firestore';
import LoadingSpinner from "../components/UI/LoadingSpinner";

// Context
type ContextType = {
  user: User | null;
  signUp: (email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  logOut: () => void;
};

export const AuthContext = createContext<ContextType>({
  user: null,
  signUp: () => {},
  signIn: () => {},
  logOut: () => {}
});

// Context Provider
type ContextProvider = {
  children?: React.ReactNode;
};

const AuthContextProvider = ({ children }: ContextProvider) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signUpHandler = (email: string, password: string) => {
    setDoc(doc(db, 'users', email), {
      savedMovies: []
    });
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInHandler = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOutHandler = () => {
    return signOut(auth);
  };

  // Get the current user logged in or not,
  // using the loading state to prevent initializing the user with the null value
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  });

  const contextValue = {
    user: user,
    signUp: signUpHandler,
    signIn: signInHandler,
    logOut: logOutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
