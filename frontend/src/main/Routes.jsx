import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../components/home/Home'
import ClienteCrud from '../components/cliente/ClienteCrud'
import ProdutoCrud from '../components/produto/ProdutoCrud'
import EntregaCrud from '../components/entrega/EntregaCrud'

export default props => (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/clientes' component={ClienteCrud} />
        <Route path='/produtos' component={ProdutoCrud} />
        <Route path='/entregas' component={EntregaCrud} />
        <Route path="*" component={Home} />
    </Switch>
)