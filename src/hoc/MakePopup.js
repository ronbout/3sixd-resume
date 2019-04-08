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
        dragging: false
      };

      this.attrs = draggable
        ? {
            onMouseDown: this.handleMouseDown,
            onMouseUp: this.handleMouseUp,
            onMouseMove: this.handleMouseMove,
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

    handleDragStart = () => {
      return false;
    };

    handleMouseDown = event => {
      console.log(event.target.getBoundingClientRect());
      this.setState({
        dragging: true
      });
      /*       let shiftX = event.clientX - parseInt(this.state.popupStyle.left);
      let shiftY = event.clientY - parseInt(this.state.popupStyle.top);
      console.log(event);
      console.log(event.screenX);
      console.log(event.clientX);
      console.log("shiftX: ", shiftX);
      console.log("shiftY: ", shiftY); */
    };

    handleMouseUp = event => {
      this.setState({
        dragging: false
      });
    };

    handleMouseMove = event => {
      if (!this.state.dragging) return;
      const newX =
        parseInt(this.state.popupStyle.left) + event.movementX + "px";
      const newY = parseInt(this.state.popupStyle.top) + event.movementY + "px";

      console.log(newX);
      this.setState(prevState => {
        return {
          popupStyle: {
            ...prevState.popupStyle,
            left: newX,
            top: newY
          }
        };
      });
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
