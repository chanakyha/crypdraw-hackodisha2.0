import React from "react";
import NavButton from "./NavButton";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";

const Header = () => {
  return (
    <header className="grid grid-cols-2 md:grid-cols-5 justify-between items-center p-5">
      <div className="flex items-center space-x-2">
        <img
          className="w-20 h-20 border-2 border-gray-500 hover:scale-75 duration-300 ease-out rounded-full cursor-pointer"
          src="https://bit.ly/3RSF3FD"
          loading="lazy"
          alt="matic-logo"
        />
        <div>
          <h1 className="text-lg text-white font-bold">CrypDraw</h1>
          <p className="text-xs text-emerald truncate">User: ...</p>
        </div>
      </div>

      <div className="hidden md:flex md:col-span-3 items-center justify-center rounded-md">
        <div className="bg-secondary p-4 space-x-2">
          <NavButton title="Buy Tickets" isActive />
          <NavButton title="Logout" />
        </div>
      </div>

      <div className="flex flex-col ml-auto text-right">
        <Bars3BottomRightIcon className="text-white h-8 w-8 mx-auto cursor-pointer" />
        <span className="md:hidden">
          <NavButton title="Logout" />
        </span>
      </div>
    </header>
  );
};

export default Header;
