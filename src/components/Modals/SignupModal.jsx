import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../store/auth-context";
import { FcGoogle } from "react-icons/fc";
import LoginWithProviderButton from "../UI/LoginWithProviderButton";
import Input from "../UI/Input";
import CloseModalButton from "./CloseModalButton";
import ModalSubmitButton from "./ModalSubmitButton";
import ModalWrapper from "./ModalWrapper";
import ErrorMessage from "../UI/ErrorMessage";

const SignupModal = ({ showSignupModal, setShowSignupModal, setShowLoginModal }) => {
  const authCtx = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = authCtx.error;

  const closeModal = () => setShowSignupModal(false);
  const showLoginModal = () => setShowLoginModal(true);

  const signUp = (e) => {
    e.preventDefault();
    authCtx.onCreateUser(email, password);
  };

  const handleGoogleLogin = () => {
    authCtx.onGoogleLogin();
    closeModal();
  };

  // Whenever a successful signup occurs, run closeModal()
  useEffect(
    (error) => {
      if (!error) {
        closeModal();
      }
      return;
    },
    [authCtx.user]
  );

  return (
    <>
      {showSignupModal && (
        <ModalWrapper>
          <div className="grid">
            {error && <ErrorMessage message={error} />}
            <CloseModalButton closeModal={closeModal} />
            <span className="mb-3 text-2xl font-semibold">Sign up to track your coins!</span>
            <LoginWithProviderButton
              providerName={"Google"}
              providerIcon={<FcGoogle className="w-6 h-6" />}
              onProviderLogin={handleGoogleLogin}
            />
            <form onSubmit={signUp} className="grid mt-3">
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                name="Email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                name="Password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <ModalSubmitButton content="Sign up" />
            </form>
            <div className="mt-3 text-sm text-black text-opacity-70 dark:text-white dark:text-opacity-70">
              Already have an account?{" "}
              <span
                onClick={() => {
                  closeModal();
                  showLoginModal();
                }}
                className="text-blue-500 hover:cursor-pointer"
              >
                Login
              </span>
            </div>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

export default SignupModal;
