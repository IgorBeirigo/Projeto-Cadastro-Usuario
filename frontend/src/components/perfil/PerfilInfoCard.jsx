import React from 'react'
import Card from '../ui/Card'
import Badge from '../ui/Badge'

const campos = [
  { label: 'Nome completo', key: 'nome' },
  { label: 'CPF', key: 'cpf' },
  { label: 'Telefone', key: 'telefone' },
  { label: 'E-mail corporativo', key: 'email' },
  { label: 'Data de admissao', key: 'dataAdmissao' },
  { label: 'Departamento', key: 'departamento' },
  { label: 'Cargo', key: 'cargo' },
  { label: 'Matricula', key: 'matricula' }
]

export default function PerfilInfoCard({ colaborador }) {
  return (
    <Card variant="elevated" className="perfil-info-card">
      <div className="perfil-card-header">
        <div>
          <h2>Informacoes Pessoais</h2>
          <p>Dados principais do colaborador no cadastro corporativo.</p>
        </div>
        <Badge variant={colaborador.status === 'Ativo' ? 'success' : 'error'} rounded>
          {colaborador.status}
        </Badge>
      </div>

      <div className="perfil-info-grid">
        {campos.map(campo => (
          <div className="perfil-info-item" key={campo.key}>
            <span>{campo.label}</span>
            <strong>{colaborador[campo.key]}</strong>
          </div>
        ))}
      </div>
    </Card>
  )
}
