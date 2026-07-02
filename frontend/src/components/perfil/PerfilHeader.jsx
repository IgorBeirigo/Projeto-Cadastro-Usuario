import React from 'react'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

const editIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </svg>
)

export default function PerfilHeader({ colaborador, onEdit }) {
  const iniciais = colaborador.nome
    .split(' ')
    .map(parte => parte[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <section className="perfil-header">
      <div className="perfil-header-content">
        <div className="perfil-avatar-grande">
          {colaborador.avatarUrl ? (
            <img src={colaborador.avatarUrl} alt={colaborador.nome} />
          ) : (
            <span>{iniciais}</span>
          )}
        </div>

        <div className="perfil-header-info">
          <div className="perfil-header-title-row">
            <h1>{colaborador.nome}</h1>
            <Badge variant={colaborador.status === 'Ativo' ? 'success' : 'error'} rounded>
              {colaborador.status}
            </Badge>
          </div>
          <p className="perfil-cargo">{colaborador.cargo}</p>
          <p className="perfil-departamento">{colaborador.departamento}</p>
          <div className="perfil-header-meta">
            <span>{colaborador.email}</span>
            <span>{colaborador.matricula}</span>
          </div>
        </div>
      </div>

      <Button variant="primary" size="lg" icon={editIcon} onClick={onEdit}>
        Editar Perfil
      </Button>
    </section>
  )
}
