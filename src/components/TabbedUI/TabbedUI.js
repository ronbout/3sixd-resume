import React from "react";

import "./css/tabbedUI.css";

const TabbedUI = props => {
  const tabs = props.tabs.map((tab, ndx) => {
    // just to keep it consistent with other code, add 1 to index
    const tabIndex = ndx + 1;
    return (
      <li
        key={tabIndex}
        className={"tab " + (props.tabIndex === tabIndex ? "active-tab" : "")}
        onClick={() => props.handleTabClick(tabIndex)}
      >
        {tab.label}
      </li>
    );
  });

  return <ul className="tab-list">{tabs}</ul>;
};

export default TabbedUI;
