import React, { Component } from 'react'
import api from '../../services/api'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'Clientes',
    subtitle: 'Cadastro de clientes: Incluir, Listar, Alterar e Excluir!'
}

const initialState = {
    cliente: { nome: '', email: '', telefone: '', endereco: '' },
    list: []
}

export default class ClienteCrud extends Component {
    state = { ...initialState }

    async componentDidMount() {
        try {
            const response = await api.get('/clientes')
            this.setState({ list: response.data })
        } catch (error) {
            console.error('Erro ao carregar clientes:', error)
        }
    }

    clear() {
        this.setState({ cliente: initialState.cliente })
    }

    async save() {
        try {
            const cliente = this.state.cliente
            const method = cliente.id ? 'put' : 'post'
            const url = cliente.id ? `/clientes/${cliente.id}` : '/clientes'
            
            console.log('Salvando cliente:', cliente)
            const response = await api[method](url, cliente)
            console.log('Resposta:', response.data)

            const list = this.getUpdatedList(response.data)
            this.setState({ cliente: initialState.cliente, list })

        } catch (error) {
            console.error('Erro ao salvar:', error)
            alert('Erro ao salvar cliente. Verifique o console para mais detalhes.')
        }
    }

    getUpdatedList(cliente, add = true) {
        const list = this.state.list.filter(c => c.id !== cliente.id)
        if(add) list.unshift(cliente)
        return list
    }

    updateField(event) {
        const cliente = { ...this.state.cliente }
        cliente[event.target.name] = event.target.value
        this.setState({ cliente })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="nome"
                                value={this.state.cliente.nome}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.cliente.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Telefone</label>
                            <input type="text" className="form-control"
                                name="telefone"
                                value={this.state.cliente.telefone}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o telefone..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Endereço</label>
                            <input type="text" className="form-control"
                                name="endereco"
                                value={this.state.cliente.endereco}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o endereço..." />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(cliente) {
        this.setState({ cliente })
    }

    async remove(cliente) {
        await api.delete(`/clientes/${cliente.id}`)
        const list = this.getUpdatedList(cliente, false)
        this.setState({ list })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Endereço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(cliente => {
            return (
                <tr key={cliente.id}>
                    <td>{cliente.nome}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.telefone}</td>
                    <td>{cliente.endereco}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(cliente)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(cliente)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}
