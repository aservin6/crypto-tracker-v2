import React from "react";

const Heading = ({ content, icon }) => {
  return (
    <h2 className="flex items-center gap-2 text-lg font-semibold md:mb-2 md:text-2xl dark:text-neutral-200 text-neutral-800">
      <span>{content}</span>
      {icon && <span>{icon}</span>}
    </h2>
  );
};

export default Heading;
