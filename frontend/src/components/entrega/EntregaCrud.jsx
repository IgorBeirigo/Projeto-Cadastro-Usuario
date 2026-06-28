import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import Card from '../ui/Card'
import Table from '../ui/Table'
import Form, { FormGroup, FormRow, FormActions } from "../ui/Form";
import Button from '../ui/Button'
import Alert from '../ui/Alert'
import './EntregaCrud.css'

/**
 * Entregas CRUD - Interface Moderna
 */
const EntregaCrud = () => {
    const [entregas, setEntregas] = useState([])
    const [clientes, setClientes] = useState([])
    const [produtos, setProdutos] = useState([])
    const [loading, setLoading] = useState(false)
    const [editingEntrega, setEditingEntrega] = useState(null)
    const [formData, setFormData] = useState({
        protocolo: '',
        status: '',
        clienteId: '',
        produtoId: ''
    })
    const [alert, setAlert] = useState(null)
    const [showForm, setShowForm] = useState(false)

    // Carregar dados ao montar
    useEffect(() => {
        loadAllData()
    }, [])

    const loadAllData = async () => {
        try {
            setLoading(true)
            const [entregasRes, clientesRes, produtosRes] = await Promise.all([
                api.get('/entregas'),
                api.get('/clientes'),
                api.get('/produtos')
            ])
            setEntregas(entregasRes.data || [])
            setClientes(clientesRes.data || [])
            setProdutos(produtosRes.data || [])
        } catch (error) {
            console.error('Erro ao carregar dados:', error)
            showAlert('Erro ao carregar dados', 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setFormData({
            protocolo: '',
            status: '',
            clienteId: '',
            produtoId: ''
        })
        setEditingEntrega(null)
        setShowForm(false)
    }

    const handleSave = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            if (editingEntrega) {
                await api.put(`/entregas/${editingEntrega.id}`, formData)
                showAlert('Entrega atualizada com sucesso!', 'success')
            } else {
                await api.post('/entregas', formData)
                showAlert('Entrega criada com sucesso!', 'success')
            }
            resetForm()
            loadAllData()
        } catch (error) {
            console.error('Erro ao salvar entrega:', error)
            showAlert('Erro ao salvar entrega', 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (entrega) => {
        setEditingEntrega(entrega)
        setFormData(entrega)
        setShowForm(true)
    }

    const handleDelete = async (entrega) => {
        if (window.confirm(`Tem certeza que deseja deletar a entrega "${entrega.protocolo}"?`)) {
            try {
                setLoading(true)
                await api.delete(`/entregas/${entrega.id}`)
                showAlert('Entrega deletada com sucesso!', 'success')
                loadAllData()
            } catch (error) {
                console.error('Erro ao deletar entrega:', error)
                showAlert('Erro ao deletar entrega', 'error')
            } finally {
                setLoading(false)
            }
        }
    }

    const showAlert = (message, type) => {
        setAlert({ message, type })
        setTimeout(() => setAlert(null), 5000)
    }

    // Função auxiliar para obter nome do cliente
    const getClienteNome = (clienteId) => {
        const cliente = clientes.find(c => c.id === Number(clienteId) || c.id === clienteId)
        return cliente ? cliente.nome : 'N/A'
    }

    // Função auxiliar para obter nome do produto
    const getProdutoNome = (produtoId) => {
        const produto = produtos.find(p => p.id === Number(produtoId) || p.id === produtoId)
        return produto ? produto.nome : 'N/A'
    }

    // Definição das colunas da tabela
    const tableColumns = [
        { key: 'protocolo', label: 'Protocolo', sortable: true },
        {
            key: 'clienteId',
            label: 'Cliente',
            sortable: false,
            render: (row) => getClienteNome(row.clienteId)
        },
        {
            key: 'produtoId',
            label: 'Produto',
            sortable: false,
            render: (row) => getProdutoNome(row.produtoId)
        },
        { key: 'status', label: 'Status', sortable: true },
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
        <div className="entrega-crud">
            <div className="crud-header">
                <div>
                    <h1>Entregas</h1>
                    <p>Cadastro, listagem, edição e exclusão de entregas</p>
                </div>
                <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setShowForm(!showForm)}
                    icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>}
                >
                    {showForm ? 'Cancelar' : 'Nova Entrega'}
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
                        {editingEntrega ? 'Editar Entrega' : 'Nova Entrega'}
                    </h2>
                    <Form onSubmit={handleSave} columns={2} gap="lg">
                        <FormRow>
                            <FormGroup label="Protocolo" required>
                                <input
                                    type="text"
                                    name="protocolo"
                                    value={formData.protocolo}
                                    onChange={handleInputChange}
                                    placeholder="Digite o protocolo..."
                                    required
                                    className="form-input"
                                />
                            </FormGroup>
                            <FormGroup label="Status" required>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                >
                                    <option value="">Selecione o status...</option>
                                    <option value="pendente">Pendente</option>
                                    <option value="enviado">Enviado</option>
                                    <option value="entregue">Entregue</option>
                                    <option value="cancelado">Cancelado</option>
                                </select>
                            </FormGroup>
                        </FormRow>
                        <FormRow>
                            <FormGroup label="Cliente" required>
                                <select
                                    name="clienteId"
                                    value={formData.clienteId}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                >
                                    <option value="">Selecione um cliente...</option>
                                    {clientes.map(cliente => (
                                        <option key={cliente.id} value={cliente.id}>
                                            {cliente.nome}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>
                            <FormGroup label="Produto" required>
                                <select
                                    name="produtoId"
                                    value={formData.produtoId}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                >
                                    <option value="">Selecione um produto...</option>
                                    {produtos.map(produto => (
                                        <option key={produto.id} value={produto.id}>
                                            {produto.nome}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>
                        </FormRow>
                        <FormActions>
                            <Button variant="secondary" onClick={resetForm}>
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit" loading={loading}>
                                {editingEntrega ? 'Atualizar' : 'Salvar'} Entrega
                            </Button>
                        </FormActions>
                    </Form>
                </Card>
            )}

            <Card variant="elevated">
                <Table
                    columns={tableColumns}
                    data={entregas}
                    options={{ paginate: true, pageSize: 10, searchable: true }}
                />
            </Card>
        </div>
    )
}

export default EntregaCrud
