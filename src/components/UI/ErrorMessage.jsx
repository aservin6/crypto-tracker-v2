import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    message && <p className="mt-3 font-semibold text-center text-red-500 ">{message}</p>
  );
};

export default ErrorMessage;
