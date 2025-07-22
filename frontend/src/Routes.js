import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './components/home/Home'
import ClienteCrud from './components/cliente/ClienteCrud'
import ProdutoCrud from './components/produto/ProdutoCrud'
import EntregaCrud from './components/entrega/EntregaCrud'

export default props => (
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/clientes' element={<ClienteCrud />} />
        <Route path='/produtos' element={<ProdutoCrud />} />
        <Route path='/entregas' element={<EntregaCrud />} />
        <Route path='*' element={<Home />} />
    </Routes>
)
