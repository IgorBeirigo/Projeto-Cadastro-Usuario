import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import Card from '../ui/Card'
import Table from '../ui/Table'
import Form, { FormGroup, FormRow, FormActions } from "../ui/Form";
import Button from '../ui/Button'
import Alert from '../ui/Alert'
import './ClienteCrud.css'

/**
 * Clientes CRUD - Interface Moderna
 */
const ClienteCrud = () => {
    const [clientes, setClientes] = useState([])
    const [loading, setLoading] = useState(false)
    const [editingCliente, setEditingCliente] = useState(null)
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        endereco: ''
    })
    const [alert, setAlert] = useState(null)
    const [showForm, setShowForm] = useState(false)

    // Carregar clientes ao montar
    useEffect(() => {
        loadClientes()
    }, [])

    const loadClientes = async () => {
        try {
            setLoading(true)
            const response = await api.get('/clientes')
            setClientes(response.data || [])
        } catch (error) {
            console.error('Erro ao carregar clientes:', error)
            showAlert('Erro ao carregar clientes', 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setFormData({ nome: '', email: '', telefone: '', endereco: '' })
        setEditingCliente(null)
        setShowForm(false)
    }

    const handleSave = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            if (editingCliente) {
                await api.put(`/clientes/${editingCliente.id}`, formData)
                showAlert('Cliente atualizado com sucesso!', 'success')
            } else {
                await api.post('/clientes', formData)
                showAlert('Cliente criado com sucesso!', 'success')
            }
            resetForm()
            loadClientes()
        } catch (error) {
            console.error('Erro ao salvar cliente:', error)
            showAlert('Erro ao salvar cliente', 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (cliente) => {
        setEditingCliente(cliente)
        setFormData(cliente)
        setShowForm(true)
    }

    const handleDelete = async (cliente) => {
        if (window.confirm(`Tem certeza que deseja deletar o cliente "${cliente.nome}"?`)) {
            try {
                setLoading(true)
                await api.delete(`/clientes/${cliente.id}`)
                showAlert('Cliente deletado com sucesso!', 'success')
                loadClientes()
            } catch (error) {
                console.error('Erro ao deletar cliente:', error)
                showAlert('Erro ao deletar cliente', 'error')
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
        { key: 'email', label: 'E-mail', sortable: false },
        { key: 'telefone', label: 'Telefone', sortable: false },
        { key: 'endereco', label: 'Endereço', sortable: false },
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
        <div className="cliente-crud">
            <div className="crud-header">
                <div>
                    <h1>Clientes</h1>
                    <p>Cadastro, listagem, edição e exclusão de clientes</p>
                </div>
                <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setShowForm(!showForm)}
                    icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>}
                >
                    {showForm ? 'Cancelar' : 'Novo Cliente'}
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
                        {editingCliente ? 'Editar Cliente' : 'Novo Cliente'}
                    </h2>
                    <Form onSubmit={handleSave} columns={2} gap="lg">
                        <FormRow>
                            <FormGroup label="Nome" required>
                                <input
                                    type="text"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleInputChange}
                                    placeholder="Digite o nome do cliente..."
                                    required
                                    className="form-input"
                                />
                            </FormGroup>
                            <FormGroup label="E-mail" required>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Digite o e-mail..."
                                    required
                                    className="form-input"
                                />
                            </FormGroup>
                        </FormRow>
                        <FormRow>
                            <FormGroup label="Telefone" required>
                                <input
                                    type="tel"
                                    name="telefone"
                                    value={formData.telefone}
                                    onChange={handleInputChange}
                                    placeholder="Digite o telefone..."
                                    className="form-input"
                                />
                            </FormGroup>
                            <FormGroup label="Endereço" required>
                                <input
                                    type="text"
                                    name="endereco"
                                    value={formData.endereco}
                                    onChange={handleInputChange}
                                    placeholder="Digite o endereço..."
                                    className="form-input"
                                />
                            </FormGroup>
                        </FormRow>
                        <FormActions>
                            <Button variant="secondary" onClick={resetForm}>
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit" loading={loading}>
                                {editingCliente ? 'Atualizar' : 'Salvar'} Cliente
                            </Button>
                        </FormActions>
                    </Form>
                </Card>
            )}

            <Card variant="elevated">
                <Table
                    columns={tableColumns}
                    data={clientes}
                    options={{ paginate: true, pageSize: 10, searchable: true }}
                />
            </Card>
        </div>
    )
}

export default ClienteCrud
