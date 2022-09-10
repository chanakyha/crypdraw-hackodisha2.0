import React from "react";
import { PropagateLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="bg-primary min-h-screen flex flex-col items-center justify-center">
      <div className="flex items-center space-x-2 mb-10">
        <img
          className="rounded-full w-20 h-20 animate-spin"
          src="https://bit.ly/3RSF3FD"
          alt="matic-img"
        />
        <h1 className="text-lg text-white font-bold">Loading the CrypDraw</h1>
      </div>
      <PropagateLoader color="white" size={30} />
    </div>
  );
};

export default Loading;
