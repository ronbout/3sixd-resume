import React, { Component } from "react";

const MakePopup = PopupComponent => {
  return class PoppedComponent extends Component {
    constructor(props) {
      super(props);
    }

    popupStyle = {
      border: "3px inset blue"
    };

    render() {
      return (
        <div style={this.popupStyle}>
          <PopupComponent {...this.props} />
        </div>
      );
    }
  };
};

export default MakePopup;
