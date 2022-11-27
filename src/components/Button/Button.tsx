import React, { PropsWithChildren } from "react";
import s from "./Button.css";

interface IButtonProps {
  className?: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: React.FC<PropsWithChildren<IButtonProps>> = ({
  children,
  className,
  onClick,
  disabled,
}): JSX.Element => {
  return (
    <button
      className={className ? s[className] : ""}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
