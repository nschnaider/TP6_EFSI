import type { User } from "../../data/user";
import { formatNum } from "../../data/user";
import "./Sidebar.css";

interface SidebarProps {
  currentView: "feed" | "profile";
  onNavigate: (view: "feed" | "profile") => void;
  user: User;
}

const Sidebar = ({ currentView, onNavigate, user }: SidebarProps) => {
  return (
    <aside className="sidebar">


      <div className="sidebar-profile" onClick={() => onNavigate("profile")}>
        <div className="sidebar-avatar-wrapper">
          <img src={user.avatar} alt={user.username} className="sidebar-avatar" />
        </div>
        <h3 className="sidebar-fullname">
          {user.fullName}
          <span className="sidebar-verified">✓</span>
        </h3>
        <p className="sidebar-username">@{user.username}</p>
        <div className="sidebar-stats">
          <div className="sidebar-stat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
            <span>{formatNum(user.followers)}</span>
          </div>
          <div className="sidebar-stat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#e1306c">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>{formatNum(user.totalLikes)}</span>
          </div>
        </div>
      </div>

    
      <nav className="sidebar-nav">

        <button
          className={`sidebar-nav-item ${currentView === "feed" ? "active" : ""}`}
          onClick={() => onNavigate("feed")}
        >
          <svg width="22" height="22" viewBox="0 0 24 24"
            fill={currentView === "feed" ? "currentColor" : "none"}
            stroke="currentColor" strokeWidth="1.5">
            <path d="M3 12L12 3l9 9" />
            <path d="M9 21V12h6v9" strokeLinejoin="round" />
          </svg>
          <span>Home</span>
        </button>

        <button className="sidebar-nav-item" onClick={() => onNavigate("feed")}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" fill="currentColor" stroke="none" />
          </svg>
          <span>Explore</span>
        </button>

        <button className="sidebar-nav-item" onClick={() => onNavigate("feed")}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="2" width="20" height="20" rx="2.18" />
            <line x1="7" y1="2" x2="7" y2="22" />
            <line x1="17" y1="2" x2="17" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="2" y1="7" x2="7" y2="7" />
            <line x1="17" y1="7" x2="22" y2="7" />
            <line x1="17" y1="17" x2="22" y2="17" />
            <line x1="2" y1="17" x2="7" y2="17" />
          </svg>
          <span>Reels</span>
        </button>

        <button className="sidebar-nav-item" onClick={() => onNavigate("feed")}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          <span>IGTV</span>
        </button>

        <button
          className={`sidebar-nav-item ${currentView === "profile" ? "active" : ""}`}
          onClick={() => onNavigate("profile")}
        >
          <svg width="22" height="22" viewBox="0 0 24 24"
            fill={currentView === "profile" ? "currentColor" : "none"}
            stroke="currentColor" strokeWidth="1.5">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span>Notification</span>
        </button>

      </nav>
    </aside>
  );
};

export default Sidebar;