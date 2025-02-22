const TabMenu = ({ activeTab, onTabChange }) => {
  const tabs = ['Rails', 'Trims', 'Vertical Rod Device Internals', "Chassis"];

  return (
    <div className="tab-menu-container">
      <div className="tab-menu">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
        <div className="tab-indicator" style={{ 
          width: `${100 / tabs.length}%`,
          transform: `translateX(${tabs.indexOf(activeTab) * 100}%)`
        }} />
      </div>
    </div>
  );
};

export default TabMenu;