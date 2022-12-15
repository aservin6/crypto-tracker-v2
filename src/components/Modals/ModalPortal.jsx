import React from "react";
import { createPortal } from "react-dom";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import TransactionModal from "./TransactionModal/TransactionModal";
const Backdrop = ({
  showLoginModal,
  showSignupModal,
  showTransactionModal,
  onCloseLogin,
  onCloseSignup,
  onCloseTransaction,
}) => {
  const closeModals = () => {
    onCloseLogin(false);
    onCloseSignup(false);
    onCloseTransaction(false);
  };
  return (
    <>
      {showLoginModal || showSignupModal || showTransactionModal ? (
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
  showTransactionModal,
  setShowTransactionModal,
}) => {
  return (
    <>
      {createPortal(
        <Backdrop
          showLoginModal={showLoginModal}
          showSignupModal={showSignupModal}
          showTransactionModal={showTransactionModal}
          onCloseLogin={setShowSignupModal}
          onCloseSignup={setShowLoginModal}
          onCloseTransaction={setShowTransactionModal}
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
      {createPortal(
        <TransactionModal
          showTransactionModal={showTransactionModal}
          setShowTransactionModal={setShowTransactionModal}
        />,
        document.getElementById("transaction-root")
      )}
    </>
  );
};

export default ModalPortal;
