/**
 *  Higher Order Component that creates a react portal to
 *  turn a component into a popup with draggable capability
 **/
import React, { Component } from "react";
import { createPortal } from "react-dom";

const popupRoot = document.getElementById("popup-root");

const MakePopup = (PopupComponent, styles = {}, draggable = false) => {
  return class PoppedComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        popupStyle: {
          boxShadow: "10px 10px 6px 3px rgba(150,150,150,0.5)",
          position: "absolute",
          opacity: "1",
          zIndex: "5000",
          left: "50px",
          top: "100px",
          background: "#aaa",
          ...styles
        },
        shiftXY: {}
      };

      this.attrs = draggable
        ? {
            draggable: true,
            onDragOver: this.handleDragOver,
            onDragEnd: this.handleDragEnd,
            onDragStart: this.handleDragStart
          }
        : {};

      this.el = document.createElement("div");
    }

    componentDidMount() {
      popupRoot.appendChild(this.el);
    }

    componentWillUnmount() {
      popupRoot.removeChild(this.el);
    }

    handleDragStart = event => {
      // have to figure out offset from where the mouse is in the div
      let shiftX = event.clientX - event.target.getBoundingClientRect().left;
      let shiftY = event.clientY - event.target.getBoundingClientRect().top;
      this.setState({
        shiftXY: { left: shiftX, top: shiftY }
      });
    };

    handleDragEnd = event => {
      this.setState({
        popupStyle: {
          ...this.state.popupStyle,
          left: event.clientX - this.state.shiftXY.left,
          top: event.clientY - this.state.shiftXY.top
        }
      });
    };

    handleDragOver = event => {
      event.preventDefault && event.preventDefault();
      return false;
    };

    render() {
      return createPortal(
        <div
          id="ball"
          style={this.state.popupStyle}
          className="make-popup"
          {...this.attrs}
        >
          <PopupComponent {...this.props} />
        </div>,
        this.el
      );
    }
  };
};

export default MakePopup;
