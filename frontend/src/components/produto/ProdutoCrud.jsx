import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import Card from '../ui/Card'
import Table from '../ui/Table'
import Form, { FormGroup, FormRow, FormActions } from "../ui/Form";
import Button from '../ui/Button'
import Alert from '../ui/Alert'
import './ProdutoCrud.css'

/**
 * Produtos CRUD - Interface Moderna
 */
const ProdutoCrud = () => {
    const [produtos, setProdutos] = useState([])
    const [loading, setLoading] = useState(false)
    const [editingProduto, setEditingProduto] = useState(null)
    const [formData, setFormData] = useState({
        nome: '',
        tipo: '',
        validade: '',
        descricao: ''
    })
    const [alert, setAlert] = useState(null)
    const [showForm, setShowForm] = useState(false)

    // Carregar produtos ao montar
    useEffect(() => {
        loadProdutos()
    }, [])

    const loadProdutos = async () => {
        try {
            setLoading(true)
            const response = await api.get('/produtos')
            setProdutos(response.data || [])
        } catch (error) {
            console.error('Erro ao carregar produtos:', error)
            showAlert('Erro ao carregar produtos', 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setFormData({ nome: '', tipo: '', validade: '', descricao: '' })
        setEditingProduto(null)
        setShowForm(false)
    }

    const handleSave = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            if (editingProduto) {
                await api.put(`/produtos/${editingProduto.id}`, formData)
                showAlert('Produto atualizado com sucesso!', 'success')
            } else {
                await api.post('/produtos', formData)
                showAlert('Produto criado com sucesso!', 'success')
            }
            resetForm()
            loadProdutos()
        } catch (error) {
            console.error('Erro ao salvar produto:', error)
            showAlert('Erro ao salvar produto', 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (produto) => {
        setEditingProduto(produto)
        setFormData(produto)
        setShowForm(true)
    }

    const handleDelete = async (produto) => {
        if (window.confirm(`Tem certeza que deseja deletar o produto "${produto.nome}"?`)) {
            try {
                setLoading(true)
                await api.delete(`/produtos/${produto.id}`)
                showAlert('Produto deletado com sucesso!', 'success')
                loadProdutos()
            } catch (error) {
                console.error('Erro ao deletar produto:', error)
                showAlert('Erro ao deletar produto', 'error')
            } finally {
                setLoading(false)
            }
        }
    }

    const showAlert = (message, type) => {
        setAlert({ message, type })
        setTimeout(() => setAlert(null), 5000)
    }

    // Definição das colunas da tabela
    const tableColumns = [
        { key: 'nome', label: 'Nome', sortable: true },
        { key: 'tipo', label: 'Tipo', sortable: true },
        {
            key: 'validade',
            label: 'Validade',
            sortable: true,
            render: (row) => row.validade ? new Date(row.validade).toLocaleDateString('pt-BR') : 'N/A'
        },
        { key: 'descricao', label: 'Descrição', sortable: false },
        {
            key: 'acoes',
            label: 'Ações',
            sortable: false,
            render: (row) => (
                <div className="table-actions">
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleEdit(row)}
                        icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>}
                    >
                        Editar
                    </Button>
                    <Button
                        size="sm"
                        variant="error"
                        onClick={() => handleDelete(row)}
                        icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>}
                    >
                        Deletar
                    </Button>
                </div>
            )
        }
    ]

    return (
        <div className="produto-crud">
            <div className="crud-header">
                <div>
                    <h1>Produtos</h1>
                    <p>Cadastro, listagem, edição e exclusão de produtos</p>
                </div>
                <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setShowForm(!showForm)}
                    icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>}
                >
                    {showForm ? 'Cancelar' : 'Novo Produto'}
                </Button>
            </div>

            {alert && (
                <Alert
                    variant={alert.type}
                    dismissible
                    onClose={() => setAlert(null)}
                >
                    {alert.message}
                </Alert>
            )}

            {showForm && (
                <Card variant="elevated" className="form-card">
                    <h2 className="form-title">
                        {editingProduto ? 'Editar Produto' : 'Novo Produto'}
                    </h2>
                    <Form onSubmit={handleSave} columns={2} gap="lg">
                        <FormRow>
                            <FormGroup label="Nome" required>
                                <input
                                    type="text"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleInputChange}
                                    placeholder="Digite o nome do produto..."
                                    required
                                    className="form-input"
                                />
                            </FormGroup>
                            <FormGroup label="Tipo" required>
                                <input
                                    type="text"
                                    name="tipo"
                                    value={formData.tipo}
                                    onChange={handleInputChange}
                                    placeholder="Digite o tipo..."
                                    required
                                    className="form-input"
                                />
                            </FormGroup>
                        </FormRow>
                        <FormRow>
                            <FormGroup label="Validade">
                                <input
                                    type="date"
                                    name="validade"
                                    value={formData.validade}
                                    onChange={handleInputChange}
                                    className="form-input"
                                />
                            </FormGroup>
                            <FormGroup label="Descrição">
                                <input
                                    type="text"
                                    name="descricao"
                                    value={formData.descricao}
                                    onChange={handleInputChange}
                                    placeholder="Digite a descrição..."
                                    className="form-input"
                                />
                            </FormGroup>
                        </FormRow>
                        <FormActions>
                            <Button variant="secondary" onClick={resetForm}>
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit" loading={loading}>
                                {editingProduto ? 'Atualizar' : 'Salvar'} Produto
                            </Button>
                        </FormActions>
                    </Form>
                </Card>
            )}

            <Card variant="elevated">
                <Table
                    columns={tableColumns}
                    data={produtos}
                    options={{ paginate: true, pageSize: 10, searchable: true }}
                />
            </Card>
        </div>
    )
}

export default ProdutoCrud