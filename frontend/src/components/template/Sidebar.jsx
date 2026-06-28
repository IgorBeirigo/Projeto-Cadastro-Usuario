import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import './Sidebar.css';

/**
 * Componente Sidebar com Collapse e Menu Moderno
 */
const Sidebar = ({ isOpen = true, onToggle = () => {} }) => {
  const [isCollapsed, setIsCollapsed] = useState(!isOpen);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
    onToggle(!isCollapsed);
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      ),
    },
    {
      id: 'clientes',
      label: 'Clientes',
      path: '/clientes',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
    {
      id: 'produtos',
      label: 'Produtos',
      path: '/produtos',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      ),
    },
    {
      id: 'entregas',
      label: 'Entregas',
      path: '/entregas',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="16" y1="21" x2="16" y2="5"></line>
          <line x1="8" y1="21" x2="8" y2="5"></line>
          <line x1="12" y1="21" x2="12" y2="7"></line>
          <path d="M3 5h18"></path>
          <path d="M5 5l1.6 8.4a2 2 0 0 0 2 1.6h6.8a2 2 0 0 0 2-1.6L19 5"></path>
        </svg>
      ),
    },
    {
      id: 'portal',
      label: 'Portal Colaborador',
      path: '/portal-colaborador',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
    },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Logo - Topo da Sidebar */}
      <Logo isCollapsed={isCollapsed} />

      {/* Toggle Button */}
      <div className="sidebar-header">
        <button
          className="sidebar-toggle"
          onClick={handleToggle}
          title={isCollapsed ? 'Expandir' : 'Recolher'}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Menu Items */}
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-menu-item ${isActive ? 'sidebar-menu-item-active' : ''}`
            }
            title={isCollapsed ? item.label : ''}
          >
            <span className="sidebar-menu-icon">{item.icon}</span>
            {!isCollapsed && <span className="sidebar-menu-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer da Sidebar */}
      <div className="sidebar-footer">
        <button className="sidebar-footer-button" title="Sair">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14"></path>
            <polyline points="16 8 20 12 16 16"></polyline>
            <line x1="7" y1="12" x2="20" y2="12"></line>
          </svg>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
