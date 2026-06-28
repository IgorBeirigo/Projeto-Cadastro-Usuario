import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/imgs/logo.png'
import './Logo.css'

/**
 * Componente Logo - Integração da Identidade Visual
 * @param {boolean} isCollapsed - Se a sidebar está colapsada
 */
const Logo = ({ isCollapsed = false }) => {
  return (
    <aside className={`logo ${isCollapsed ? 'logo-collapsed' : ''}`}>
      <Link to="/" className="logo-container" title="Ir para Dashboard">
        <img src={logo} alt="IDIS - Sistema de Gestão" />
      </Link>
    </aside>
  )
}

export default Logo