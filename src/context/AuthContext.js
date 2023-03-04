import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./../firebase/index";

const AuthContext = createContext({
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  signInWithGoogle: () => Promise,
  logout: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      localStorage.setItem("currentUser", JSON.stringify(user));
      setCurrentUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  function logout() {
    localStorage.clear();
    return signOut(auth);
  }

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  const value = {
    currentUser,
    signInWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
