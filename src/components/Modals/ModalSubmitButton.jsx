import React from "react";

const ModalSubmitButton = ({ content }) => {
  return (
    <button
      type="submit"
      className="py-3 mt-4 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-400"
    >
      {content}
    </button>
  );
};

export default ModalSubmitButton;
