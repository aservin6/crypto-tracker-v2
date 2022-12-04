import React from "react";

const Input = ({type, name, id, onChange}) => {
  return (
    <input
      className="border text-neutral-900 text-base px-3 py-1.5 outline-none dark:text-white dark:border-white dark:border-opacity-20 dark:bg-neutral-700 rounded-[.1875rem] mb-3 h-12"
      type={type}
      name={name}
      id={id}
      onChange={onChange}
    />
  );
};

export default Input;
