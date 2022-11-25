import React, { PropsWithChildren } from "react";
import s from "./Button.css";

interface IButtonProps {
  className?: string;
  onClick: () => void;
}

export const Button: React.FC<PropsWithChildren<IButtonProps>> = ({
  children,
  className,
  onClick,
}): JSX.Element => {
  return (
    <button className={className ? s[className] : ""} onClick={() => onClick()}>
      {children}
    </button>
  );
};
