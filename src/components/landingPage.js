import React, { Component } from "react";
import Hero from "./hero";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Hero />
        {/*         <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.0"
          id="Layer_1"
          x="0px"
          y="0px"
          width="64px"
          height="64px"
          viewBox="0 0 64 64"
          enable-background="new 0 0 64 64"
          xmlSpace="preserve"
        >
          <g>
            <path
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeMiterlimit="10"
              d="M29,6L46,6L63,27L32,58L1,27L18,6L32,6L32,58"
              style="stroke-dasharray: 225, 227; stroke-dashoffset: 0;"
            />
            <path
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeMiterlimit="10"
              d="M32,57L18,27L24,6"
              style="stroke-dasharray: 55, 57; stroke-dashoffset: 0;"
            />
            <path
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeMiterlimit="10"
              d="M32,57L46,27L40,6"
              style="stroke-dasharray: 55, 57; stroke-dashoffset: 0;"
            />
            <path
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeMiterlimit="10"
              d="M1,27L63,27"
              style="stroke-dasharray: 62, 64; stroke-dashoffset: 0;"
            />
          </g>
        </svg> */}
      </React.Fragment>
    );
  }
}

export default LandingPage;
