import React from "react";

const ModalSubmitButton = ({ content }) => {
  return (
    <button
      type="submit"
      className="py-3 mt-4 font-bold text-white rounded-md bg-rose-500 hover:bg-rose-400"
    >
      {content}
    </button>
  );
};

export default ModalSubmitButton;
