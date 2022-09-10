import React from "react";

interface Props {
  title: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavButton = ({ title, isActive, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`${
        isActive && "bg-btn-primary"
      } hover:bg-btn-primary text-white py-2 px-4 rounded font-bold`}
    >
      {title}
    </button>
  );
};

export default NavButton;
