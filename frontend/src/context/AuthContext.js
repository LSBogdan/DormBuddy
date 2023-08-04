import { createContext, useContext, useEffect, useState } from "react";
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getUserByEmail } from '../users';
import { getProfilePhoto } from "../aws";

const AuthContext = createContext()

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({})
  const [userData, setUserData] = useState(null);
  const [photo, setPhoto] = useState(null);

  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const email = user?.email;

  useEffect( () => { 
    try {
            getUserByEmail(email)
                .then( (data) => {
                    // console.log(data);
                    setUserData(data);
                })
    } catch (error) {
      console.error(error);
    }
  }, [email]);

  useEffect( () => { 
    try {
            getProfilePhoto(email)
                .then( (data) => {
                    // console.log(data);
                    setPhoto(data);
                })
    } catch (error) {
      console.error(error);
      return null;
    }
  }, [email]);
  

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user, email, userData, photo }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
