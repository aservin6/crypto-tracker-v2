import React from "react";

const LoginWithProviderButton = ({
  providerName,
  providerIcon,
  onProviderLogin,
}) => {
  return (
    <button
      onClick={onProviderLogin}
      className="flex items-center justify-center px-5 py-3 text-sm font-bold border rounded-md hover:bg-neutral-50 hover:border-neutral-400 dark:border-white dark:border-opacity-20 dark:hover:bg-neutral-700"
    >
      <div className="flex-initial">{providerIcon}</div>
      <span className="flex-1">Continue with {providerName}</span>
    </button>
  );
};

export default LoginWithProviderButton;
