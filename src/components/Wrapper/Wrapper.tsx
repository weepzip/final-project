import { useAppDispatch } from "../../hooks";
import React, { PropsWithChildren } from "react";
import s from "./Wrapper.css";
import { toggleSlider } from "../../store/photos";

export const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(toggleSlider());
    e.stopPropagation();
  };

  return (
    <div className={s.wrapper} onClick={handleClick}>
      <div className={s.container}>{children}</div>
    </div>
  );
};
