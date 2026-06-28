import React, { useState } from 'react';
import './TopHeader.css';

/**
 * Top Header Component - Cabeçalho Superior com Avatar, Notificações e Busca
 */
const TopHeader = ({ userName = 'Usuário', userAvatar = null, onLogout = () => {} }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Mock de notificações
  const notifications = [
    { id: 1, type: 'success', message: '2 novos clientes cadastrados', time: 'há 5 min' },
    { id: 2, type: 'warning', message: 'Entrega pendente para revisar', time: 'há 15 min' },
    { id: 3, type: 'info', message: 'Novo produto adicionado', time: 'há 1 hora' },
  ];

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    onLogout();
  };

  return (
    <header className="top-header">
      <div className="top-header-container">
        {/* Espaço à esquerda para título da página */}
        <div className="top-header-title">
          <div className="top-header-title-placeholder">Dashboard</div>
        </div>

        {/* Barra de Busca - Centro */}
        <div className="top-header-search">
          <input
            type="text"
            className="top-header-search-input"
            placeholder="Buscar clientes, produtos, entregas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="top-header-search-button" title="Buscar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </div>

        {/* Controles à Direita */}
        <div className="top-header-actions">
          {/* Notificações */}
          <div className="top-header-notifications">
            <button
              className="top-header-action-button"
              onClick={() => setShowNotifications(!showNotifications)}
              title="Notificações"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              {notifications.length > 0 && (
                <span className="notification-badge">{notifications.length}</span>
              )}
            </button>

            {/* Dropdown de Notificações */}
            {showNotifications && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h3>Notificações</h3>
                  <button
                    className="notification-close"
                    onClick={() => setShowNotifications(false)}
                  >
                    ×
                  </button>
                </div>
                <div className="notification-list">
                  {notifications.map((notif) => (
                    <div key={notif.id} className={`notification-item notification-${notif.type}`}>
                      <div className="notification-content">
                        <p className="notification-message">{notif.message}</p>
                        <span className="notification-time">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Configurações */}
          <button className="top-header-action-button" title="Configurações">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6"></path>
              <path d="M4.22 4.22l4.24 4.24m2.12 2.12l4.24 4.24"></path>
              <path d="M1 12h6m6 0h6"></path>
              <path d="M4.22 19.78l4.24-4.24m2.12-2.12l4.24-4.24"></path>
            </svg>
          </button>

          {/* Perfil do Usuário */}
          <div className="top-header-user">
            <button
              className="top-header-user-button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              title={userName}
            >
              {userAvatar ? (
                <img src={userAvatar} alt={userName} className="user-avatar-image" />
              ) : (
                <div className="user-avatar-placeholder">{getInitials(userName)}</div>
              )}
              <span className="user-name">{userName}</span>
            </button>

            {/* Menu do Usuário */}
            {showUserMenu && (
              <div className="user-menu-dropdown">
                <div className="user-menu-header">
                  <div className="user-menu-info">
                    <div className="user-menu-avatar">
                      {userAvatar ? (
                        <img src={userAvatar} alt={userName} />
                      ) : (
                        <div className="user-avatar-placeholder">{getInitials(userName)}</div>
                      )}
                    </div>
                    <div>
                      <p className="user-menu-name">{userName}</p>
                      <p className="user-menu-email">user@example.com</p>
                    </div>
                  </div>
                </div>

                <div className="user-menu-divider"></div>

                <button className="user-menu-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Meu Perfil
                </button>

                <button className="user-menu-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="1"></circle>
                    <path d="M12 1v6m0 6v6"></path>
                    <path d="M4.22 4.22l4.24 4.24m2.12 2.12l4.24 4.24"></path>
                    <path d="M1 12h6m6 0h6"></path>
                  </svg>
                  Configurações
                </button>

                <div className="user-menu-divider"></div>

                <button className="user-menu-item user-menu-item-logout" onClick={handleLogout}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14"></path>
                    <polyline points="16 8 20 12 16 16"></polyline>
                    <line x1="7" y1="12" x2="20" y2="12"></line>
                  </svg>
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
