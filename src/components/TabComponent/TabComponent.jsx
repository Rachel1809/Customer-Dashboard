import React from 'react';
import './TabComponent.css';

function TabList({ children, activeTab, onTabClick }) {
  return (
    <div className="tab-list">
      {React.Children.map(children, (child) => {
        if (child.type.name === "Tab") {
          return React.cloneElement(child, {
            isActive: child.props.index === activeTab,
            onClick: () => { console.log(child.props.index); onTabClick(child.props.index) }
          })
        }
        return child;
      })}
    </div>
  )
}

function Tab({ children, isActive, onClick }) {
  return (
    <div className={`tab ${isActive ? 'active' : ''}`} onClick={onClick}>
      {children}
    </div>
  )
}

function TabPanel(props) {
  const { children, activeTab, index } = props;

  return (
    <div
      className={`tab-panel ${activeTab === index ? "active" : ""}`}
      role="tabpanel"
      aria-hidden={activeTab !== index}
      aria-labelledby={`tab-${index}`}
    >
      {children}
    </div>
  );
}

export { TabList, Tab, TabPanel };