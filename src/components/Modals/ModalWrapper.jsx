import React from "react";

const ModalWrapper = ({ children }) => {
  return (
    <div className="absolute top-0 z-20 w-screen h-screen p-4 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-primary md:left-1/2 md:top-0 md:-translate-x-1/2 md:rounded-md md:h-auto md:w-full md:max-w-lg md:my-10 md:mx-auto">
      {children}
    </div>
  );
};

export default ModalWrapper;
