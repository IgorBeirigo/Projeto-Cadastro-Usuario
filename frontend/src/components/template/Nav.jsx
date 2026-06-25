import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/clientes">
                <i className="fa fa-users"></i> Clientes
            </Link>
            <Link to="/produtos">
                <i className="fa fa-shopping-basket"></i> Produtos
            </Link>
            <Link to="/entregas">
                <i className="fa fa-truck"></i> Entregas
            </Link>
            <Link to="/portal-colaborador">
                <i className="fa fa-user-tie"></i> Portal do Colaborador
            </Link>
        </nav>
    </aside>