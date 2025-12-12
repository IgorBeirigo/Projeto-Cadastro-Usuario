import React, {Component} from 'react';
import axios from 'axios';
import Main from '../template/Main';


const headerProps = {
    icon: 'cube',
    title: 'Produtos',
    subtitle: 'Cadastro de produtos: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/api/produtos';

const initialState = {
    produto: { nome: '', tipo:'',validade: '', descricao: ''},
    list: []
}

export default class ProdutoCrud extends Component {
  state = { ...initialState }

  componentDidMount() {
    axios(baseUrl).then(resp => {
      this.setState({ list: resp.data })
    })
  }
 

clear(){
  this.setState({ produto: initialState.produto})

}

save() {
  const produto = this.state.produto
  const method = produto.id ? 'put' : 'post'
  const url = produto.id ? `${baseUrl}/${produto.id}` : baseUrl

  axios [method](url, produto
  ).then(resp => {
    const list = this.getUpdatedList(resp.data)
    this.setState({ produto: initialState.produto, list })
  })
}
getUpdatedList(produto, add = true) {
  const list = this.state.list.filter(p => p.id !== produto.id)
  if (add) list.unshift(produto)
  return list
}
updateField(event) {
  const produto = { ...this.state.produto }
  produto[event.target.name] = event.target.value
  this.setState({ produto })
}
load(produto) {
  this.setState({ produto })
}
remove(produto) {
  axios.delete(`${baseUrl}/${produto.id}`).then(resp => {
    const list = this.getUpdatedList(produto, false)
    this.setState({ list })
  })
}
renderForm() {
  return (
    <div className = "form">
      <div className="row">
        <div className= "col-6">
          <div className="form-group">
            <label>Nome</label>
            <input type="text" className="form-control"
              name="nome" value={this.state.produto.nome}
              onChange={e => this.updateField(e)} />
          </div>
          </div>
          <div className="col-6">
          <div className="form-group">
            <label>Tipo</label>
            <input type="text" className="form-control"
              name="tipo" value={this.state.produto.tipo}
              onChange={e => this.updateField(e)} />
          </div>
          </div>
          <div className="col-6">
          <div className="form-group">
            <label>Validade</label>
            <input type="date" className="form-control"
              name="validade" value={this.state.produto.validade}
              onChange={e => this.updateField(e)} />
          </div>
          </div>
          <div className="col-6">
          <div className="form-group">
            <label>Descrição</label>
            <input type="text" className="form-control"
              name="descricao" value={this.state.produto.descricao}
              onChange={e => this.updateField(e)} />
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
        {this.state.list.map(produto => {
          return (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>{produto.tipo}</td>
              <td>{produto.validade}</td>
              <td>{produto.descricao}</td>
              <td>
                <button className="btn btn-warning"
                  onClick={() => this.load(produto)}>
                  Editar
                </button>
                <button className="btn btn-danger ml-2"
                  onClick={() => this.remove(produto)}>
                  Excluir
                </button>
              </td>
            </tr>
          )
        } 
        )}
      </tbody>
    </table>
  )
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