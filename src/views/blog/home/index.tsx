import React from "react";
import { NavLink } from "react-router";

export const Home: React.FC = () => {
  return (
    <div>
      <NavLink to="/blog/detail?id=2">DETIAL</NavLink>
    </div>
  );
};
export default Home;
