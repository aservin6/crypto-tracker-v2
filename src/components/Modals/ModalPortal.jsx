import React from "react";
import { createPortal } from "react-dom";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const Backdrop = ({
  showLoginModal,
  showSignupModal,
  onCloseLogin,
  onCloseSignup,
}) => {
  
  const closeModals = () => {
    onCloseLogin(false);
    onCloseSignup(false);
  };
  return (
    <>
      {showLoginModal || showSignupModal ? (
        <div
          onClick={closeModals}
          className="fixed top-0 left-0 z-10 w-full h-screen bg-black bg-opacity-20"
        ></div>
      ) : null}
    </>
  );
};

const ModalPortal = ({
  showLoginModal,
  showSignupModal,
  setShowSignupModal,
  setShowLoginModal,
}) => {
  return (
    <>
      {createPortal(
        <Backdrop
          showLoginModal={showLoginModal}
          showSignupModal={showSignupModal}
          onCloseLogin={setShowSignupModal}
          onCloseSignup={setShowLoginModal}
        />,
        document.getElementById("backdrop-root")
      )}
      {createPortal(
        <LoginModal
          showLoginModal={showLoginModal}
          setShowLoginModal={setShowLoginModal}
          setShowSignupModal={setShowSignupModal}
        />,
        document.getElementById("login-root")
      )}
      {createPortal(
        <SignupModal
          showSignupModal={showSignupModal}
          setShowSignupModal={setShowSignupModal}
          setShowLoginModal={setShowLoginModal}
        />,
        document.getElementById("signup-root")
      )}
    </>
  );
};

export default ModalPortal;
