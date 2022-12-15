import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-500"></div>
      <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-500"></div>
      <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-500"></div>
    </div>
  );
};

export default Loading;
