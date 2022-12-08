import { useContext, useEffect, useState } from "react";
import UserContext from "../../store/auth-context";
import { FcGoogle } from "react-icons/fc";
import LoginWithProviderButton from "../UI/LoginWithProviderButton";
import Input from "../UI/Input";
import CloseModalButton from "./CloseModalButton";
import ModalSubmitButton from "./ModalSubmitButton";
import ModalWrapper from "./ModalWrapper";
import ErrorMessage from "../UI/ErrorMessage";

const LoginModal = ({
  showLoginModal,
  setShowLoginModal,
  setShowSignupModal,
}) => {
  const authCtx = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = authCtx.error;

  const closeModal = () => setShowLoginModal(false);
  const showSignupModal = () => setShowSignupModal(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    authCtx.onSignIn(email, password);
  };

  const handleGoogleLogin = () => {
    authCtx.onGoogleLogin();
    closeModal();
  };

  // Whenever a successful login occurs, run closeModal()
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
      {showLoginModal && (
        <ModalWrapper>
          <div className="grid">
            {error && <ErrorMessage message={error} />}
            <CloseModalButton closeModal={closeModal} />
            <span className="mb-3 text-2xl font-semibold">Login to view your coins!</span>
            <form onSubmit={handleSubmit} className="grid text-sm">
              <label htmlFor="email" className="mb-1">
                Email
              </label>
              <Input
                type="email"
                name="Email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password" className="mb-1">
                Password
              </label>
              <Input
                type="password"
                name="Password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <ModalSubmitButton content="Login" />
            </form>
            <div className="my-4 text-xs text-center text-white text-opacity-80">
              Or
            </div>
            <LoginWithProviderButton
              providerName={"Google"}
              providerIcon={<FcGoogle className="w-6 h-6" />}
              onProviderLogin={handleGoogleLogin}
            />
            <div className="mt-3 text-sm text-black text-opacity-70 dark:text-white dark:text-opacity-70">
              Don't have an account?{" "}
              <span
                onClick={() => {
                  closeModal();
                  showSignupModal();
                }}
                className="text-blue-500 hover:cursor-pointer"
              >
                Sign up
              </span>
            </div>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

export default LoginModal;
