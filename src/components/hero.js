import React from "react";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <header className="hero">
      <div className="container text-center">
        <h1>Jobs For IT Professionals</h1>
        <p>
          3sixD offers best-in-class positions for IT consulting and
          professionals looking for long term contract positions at top
          companies. We curate so you can find your next great job faster.
        </p>
        <NavLink to="/signup">
          <button className="learn btn btn-danger">Sign Up</button>
        </NavLink>
      </div>
    </header>
  );
};

export default Hero;
