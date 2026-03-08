import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setCurrentUser(null);
        setAuthLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", firebaseUser.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists() || !userDoc.data()?.isActive) {
          setCurrentUser(null);
          setAuthLoading(false);
          return;
        }

        setCurrentUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          ...userDoc.data()
        });

      } catch (error) {
        console.error("Failed to load user profile", error);
        setCurrentUser(null);
      } finally {
        setAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user: currentUser, loading: authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);