import React from 'react';

const Contribute = () => {
    const VITE_REPO = import.meta.env.VITE_REPO;
    console.log(VITE_REPO);
  const handleContributeClick = () => {
    // Redirect to the GitHub repository
    window.open(VITE_REPO, '_blank');
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <button
        onClick={handleContributeClick}
        className="bg-blue-500 text-white px-6 py-3 rounded-full text-xl hover:bg-blue-700 transition duration-300"
      >
        Contribute to This Project
      </button>
    </div>
  );
};

export { Contribute};
