import React, { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { database } from "../utils/firebase";
import { set, ref } from "firebase/database";

const UserContext = createContext({
  user: {},
  onCreateUser: () => {},
  onLogout: () => {},
  onSignIn: () => {},
  onGoogleLogin: () => {},
  error: null,
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const addUserToDb = (user) => {
    const uid = user.uid;
    set(ref(database, "users/" + uid), {
      email: user.email,
      uid: uid,
    });
  };

  const createUser = async (email, password) => {
    setError(null);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      addUserToDb(res.user);
      console.log(res.user);
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  const signIn = async (email, password) => {
    setError(null);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      console.log(res.user);
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  const logout = async () => {
    setError(null);
    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  const googleProvider = new GoogleAuthProvider();

  const googleLogin = async () => {
    setError(null);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const { isNewUser } = getAdditionalUserInfo(res);
      if (isNewUser) {
        console.log(isNewUser);
        addUserToDb(res.user);
      }
      setUser(res.user);
      console.log(res.user);
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: user,
        onCreateUser: createUser,
        onLogout: logout,
        onSignIn: signIn,
        onGoogleLogin: googleLogin,
        error: error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
