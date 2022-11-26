import React from "react";
import { Link } from "react-router-dom";
import s from "./Header.css";

export const Header = (): JSX.Element => {
  return (
    <header>
      <div className={s.container}>
        <ul className={s.menu}>
          <li className={s.menu_item}>
            <Link to="/posts">Posts</Link>
          </li>
          <li className={s.menu_item}>
            <Link to="/albums">Albums</Link>
          </li>
          <li className={s.menu_item}>
            <Link to="/todos">Todos</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
