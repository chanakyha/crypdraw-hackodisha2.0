import React from "react";
import { useMetamask } from "@thirdweb-dev/react";

const Login = () => {
  const connectWithMetamask = useMetamask();
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center text-center">
      <div className="flex flex-col items-center mb-10">
        <img
          className="rounded-full h-56 w-56 mb-10 border-2 border-gray-500 hover:animate-spin cursor-pointer"
          src="https://bit.ly/3RSF3FD"
          alt="matic-img"
        />
        <h1 className="text-6xl text-white font-bold">CrypDraw Dapp</h1>
        <h2 className="text-white mt-2">
          Get Started by Conneting your Metamask
        </h2>

        <button
          onClick={connectWithMetamask}
          className="bg-white px-8 py-5 mt-10 rounded-lg shadow-lg font-bold hover:scale-90 duration-300 ease-out"
        >
          Login with Metamask
        </button>
      </div>
    </div>
  );
};

export default Login;
