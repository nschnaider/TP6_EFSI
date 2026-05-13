// Header.tsx
// ¿Para qué sirve? Barra superior fija de la app.
// Muestra el logo, botones de navegación y el avatar del usuario.
// Se conecta con App.tsx a través de props.

import "./Header.css";

// Interface de props — tipamos exactamente qué datos recibe este componente
interface HeaderProps {
  currentView: "feed" | "profile"; // vista actual para marcar el botón activo
  onNavigate: (view: "feed" | "profile") => void; // función que cambia la vista
  // "(view: 'feed' | 'profile') => void" significa:
  //   es una función que recibe un string (feed o profile) y no devuelve nada
  userAvatar: string; // URL del avatar
}

// Recibimos las props desestructuradas directamente
const Header = ({ currentView, onNavigate, userAvatar }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-container">

        {/* Logo */}
        <div className="header-logo">
          <span className="header-logo-text">Catsgram</span>
          <span className="header-logo-icon">🐾</span>
        </div>

        {/* Navegación central */}
        <nav className="header-nav">
          <button
            // Si currentView es "feed", agregamos la clase "active"
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

        {/* Avatar del usuario — clic lleva al perfil */}
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