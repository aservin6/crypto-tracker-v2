import React from "react";

const Portfolio = ({ setShowTransactionModal }) => {

  const openModal = () => setShowTransactionModal(true);

  return (
    <div>
      <div>Portfolio</div>
      <button onClick={openModal} className="bg-blue-500 text-white rounded-md px-2 py-1.5 hover:bg-blue-400">
        Add Transaction
      </button>
    </div>
  );
};

export default Portfolio;
