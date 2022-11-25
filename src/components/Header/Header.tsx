import React from "react";
import { Link } from "react-router-dom";

export const Header = (): JSX.Element => {
  return (
    <header>
      <ul className="menu">
        <li className="menu-item">
          <Link to="/posts">Posts</Link>
        </li>
        <li className="menu-item">
          <Link to="/albums">Albums</Link>
        </li>
      </ul>
    </header>
  );
};
