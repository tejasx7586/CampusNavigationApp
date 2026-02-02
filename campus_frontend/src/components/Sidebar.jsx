import "./Sidebar.css";

const menuItems = [
  { id: "map", icon: "🗺️", label: "Map View" },
  { id: "buildings", icon: "🏢", label: "Buildings" },
  { id: "directions", icon: "🧭", label: "Directions" },
  { id: "facilities", icon: "🔍", label: "Facilities" },
];

export default function Sidebar({ activeView, onViewChange, collapsed, onToggleCollapse }) {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && (
          <div className="sidebar-logo">
            <div className="logo-icon-small">
              <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 5 L35 13 L35 27 L20 35 L5 27 L5 13 Z" fill="currentColor"/>
              </svg>
            </div>
            <span className="logo-text">Campus Nav</span>
          </div>
        )}
        <button className="collapse-btn" onClick={onToggleCollapse}>
          {collapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => onViewChange(item.id)}
            title={collapsed ? item.label : ''}
          >
            <span className="nav-icon">{item.icon}</span>
            {!collapsed && <span className="nav-label">{item.label}</span>}
            {activeView === item.id && <span className="nav-indicator" />}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        {!collapsed && (
          <div className="footer-info">
            <p className="footer-text">Deakin University</p>
            <p className="footer-subtext">Burwood Campus</p>
          </div>
        )}
      </div>
    </aside>
  );
}