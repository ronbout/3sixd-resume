import React from "react";

import "./css/tabbedUI.css";

const TabbedUI = props => {
  const tabs = props.tabs.map((tab, ndx) => {
    return (
      <li
        key={ndx}
        className={"tab " + (props.tabIndex === ndx ? "active-tab" : "")}
        onClick={() => props.handleTabClick(ndx)}
      >
        {tab.label}
      </li>
    );
  });

  return <ul className="tab-list">{tabs}</ul>;
};

export default TabbedUI;
