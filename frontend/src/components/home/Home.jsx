import React from 'react'
import Main from '../template/Main'

export default props =>
    <Main icon="home" title="Início"
        subtitle="Painel Administrativo da IDIS.">
        <div className='display-4'>Bem Vindo!</div>
        <hr />
        <p className="mb-0">Painel administrativo da empresa IDIS para gerenciar 
            Clientes, Cadastrar Produtos e filtrar Entregas!</p>
    </Main>