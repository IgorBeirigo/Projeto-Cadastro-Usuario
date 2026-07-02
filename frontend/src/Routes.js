import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './components/home/Home'
import ClienteCrud from './components/cliente/ClienteCrud'
import ProdutoCrud from './components/produto/ProdutoCrud'
import EntregaCrud from './components/entrega/EntregaCrud'
import PortalColaborador from './pages/PortalColaborador'
import Holerites from './pages/Holerites'
import FolhaPonto from './pages/FolhaPonto'
import BaterPonto from './pages/BaterPonto'
import MeuPerfil from './pages/MeuPerfil'

export default props => (
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/clientes' element={<ClienteCrud />} />
        <Route path='/produtos' element={<ProdutoCrud />} />
        <Route path='/entregas' element={<EntregaCrud />} />
        <Route path='/portal-colaborador' element={<PortalColaborador />} />
        <Route path='/portal-colaborador/meu-perfil' element={<MeuPerfil />} />
        <Route path='/portal-colaborador/holerites' element={<Holerites />} />
        <Route path='/portal-colaborador/ponto' element={<FolhaPonto />} />
        <Route path='/portal-colaborador/bater-ponto' element={<BaterPonto />} />
        <Route path='*' element={<Home />} />
    </Routes>
)
