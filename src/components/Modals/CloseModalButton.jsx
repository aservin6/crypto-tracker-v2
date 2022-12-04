import React from "react";
import { CgClose } from "react-icons/cg";

const CloseModalButton = ({ closeModal }) => {
  return (
    <button onClick={closeModal} className="mb-5 w-fit">
      <CgClose className="w-8 h-8 hover:text-neutral-500 dark:hover:text-neutral-400" />
    </button>
  );
};

export default CloseModalButton;
