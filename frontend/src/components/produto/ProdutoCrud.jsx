import React, { Component } from 'react'
import Main from '../template/Main'
import api from '../../services/api'

const headerProps = {
    icon: 'shopping-basket',
    title: 'Produtos',
    subtitle: 'Cadastro de produtos: Incluir, Listar, Alterar e Excluir!'
}

const initialState = {
    produto: { nome: '', tipo: '', validade: '', descricao: '' },
    list: []
}

export default class ProdutoCrud extends Component {
    state = { ...initialState }

    async componentDidMount() {
        try {
            const response = await api.get('/produtos')
            this.setState({ list: response.data })
        } catch (error) {
            console.error('Erro ao carregar produtos:', error)
        }
    }

    clear() {
        this.setState({ produto: initialState.produto })
    }

    async save() {
        const produto = this.state.produto
        const method = produto.id ? 'put' : 'post'
        const url = produto.id ? `/produtos/${produto.id}` : '/produtos'
        try {
            const response = await api[method](url, produto)
            const list = this.getUpdatedList(response.data)
            this.setState({ produto: initialState.produto, list })
        } catch (error) {
            console.error('Erro ao salvar produto:', error)
        }
    }

    getUpdatedList(produto, add = true) {
        const list = this.state.list.filter(p => p.id !== produto.id)
        if(add) list.unshift(produto)
        return list
    }

    updateField(event) {
        const produto = { ...this.state.produto }
        produto[event.target.name] = event.target.value
        this.setState({ produto })
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
                                value={this.state.produto.nome}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Tipo</label>
                            <input type="text" className="form-control"
                                name="tipo"
                                value={this.state.produto.tipo}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o tipo..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Validade</label>
                            <input type="date" className="form-control"
                                name="validade"
                                value={this.state.produto.validade}
                                onChange={e => this.updateField(e)} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Descrição</label>
                            <input type="text" className="form-control"
                                name="descricao"
                                value={this.state.produto.descricao}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a descrição..." />
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

    load(produto) {
        this.setState({ produto })
    }

    async remove(produto) {
        try {
            await api.delete(`/produtos/${produto.id}`)
            const list = this.getUpdatedList(produto, false)
            this.setState({ list })
        } catch (error) {
            console.error('Erro ao remover produto:', error)
        }
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Validade</th>
                        <th>Descrição</th>
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
        return this.state.list.map(produto => {
            return (
                <tr key={produto.id}>
                    <td>{produto.nome}</td>
                    <td>{produto.tipo}</td>
                    <td>{produto.validade}</td>
                    <td>{produto.descricao}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(produto)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(produto)}>
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
