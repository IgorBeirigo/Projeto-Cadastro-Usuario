import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'truck',
    title: 'Entregas',
    subtitle: 'Cadastro de entregas: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/entregas'
const initialState = {
    entrega: { 
        protocolo: '', 
        status: '',
        clienteId: '',
        produtoId: '' 
    },
    list: [],
    clientes: [],
    produtos: []
}

export default class EntregaCrud extends Component {
    state = { ...initialState }

    componentDidMount() {
        axios.get(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
        axios.get('http://localhost:3001/clientes').then(resp => {
            this.setState({ clientes: resp.data })
        })
        axios.get('http://localhost:3001/produtos').then(resp => {
            this.setState({ produtos: resp.data })
        })
    }

    clear() {
        this.setState({ entrega: initialState.entrega })
    }

    save() {
        const entrega = this.state.entrega
        const method = entrega.id ? 'put' : 'post'
        const url = entrega.id ? `${baseUrl}/${entrega.id}` : baseUrl
        axios[method](url, entrega)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ entrega: initialState.entrega, list })
            })
    }

    getUpdatedList(entrega, add = true) {
        const list = this.state.list.filter(e => e.id !== entrega.id)
        if(add) list.unshift(entrega)
        return list
    }

    updateField(event) {
        const entrega = { ...this.state.entrega }
        entrega[event.target.name] = event.target.value
        this.setState({ entrega })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Protocolo</label>
                            <input type="text" className="form-control"
                                name="protocolo"
                                value={this.state.entrega.protocolo}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o protocolo..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Status</label>
                            <input type="text" className="form-control"
                                name="status"
                                value={this.state.entrega.status}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o status..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Cliente</label>
                            <select className="form-control"
                                name="clienteId"
                                value={this.state.entrega.clienteId}
                                onChange={e => this.updateField(e)}>
                                <option value="">Selecione um cliente...</option>
                                {this.state.clientes.map(cliente => (
                                    <option key={cliente.id} value={cliente.id}>
                                        {cliente.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Produto</label>
                            <select className="form-control"
                                name="produtoId"
                                value={this.state.entrega.produtoId}
                                onChange={e => this.updateField(e)}>
                                <option value="">Selecione um produto...</option>
                                {this.state.produtos.map(produto => (
                                    <option key={produto.id} value={produto.id}>
                                        {produto.nome}
                                    </option>
                                ))}
                            </select>
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

    load(entrega) {
        this.setState({ entrega })
    }

    remove(entrega) {
        axios.delete(`${baseUrl}/${entrega.id}`).then(resp => {
            const list = this.getUpdatedList(entrega, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Protocolo</th>
                        <th>Status</th>
                        <th>Cliente</th>
                        <th>Produto</th>
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
        return this.state.list.map(entrega => {
            return (
                <tr key={entrega.id}>
                    <td>{entrega.protocolo}</td>
                    <td>{entrega.status}</td>
                    <td>{entrega.Cliente?.nome}</td>
                    <td>{entrega.Produto?.nome}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(entrega)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(entrega)}>
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
