import "./Header.css";

interface HeaderProps {
  currentView: "feed" | "profile";
  onNavigate: (view: "feed" | "profile") => void;
  userAvatar: string; 
}

const Header = ({ currentView, onNavigate, userAvatar }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-container">

        <div className="header-logo">
          <span className="header-logo-text">Instagram</span>
          <span className="header-logo-icon">🐾</span>
        </div>

        <nav className="header-nav">
          <button
            className={`header-nav-btn ${currentView === "feed" ? "active" : ""}`}
            onClick={() => onNavigate("feed")}
            title="Inicio"
          >
            🏠
          </button>
          <button
            className={`header-nav-btn ${currentView === "profile" ? "active" : ""}`}
            onClick={() => onNavigate("profile")}
            title="Perfil"
          >
            👤
          </button>
        </nav>

        <div className="header-user">
          <img
            src={userAvatar}
            alt="Mi perfil"
            className="header-avatar"
            onClick={() => onNavigate("profile")}
          />
        </div>

      </div>
    </header>
  );
};

export default Header;