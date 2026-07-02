import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { perfilAcoes } from './perfilMock'

const actionIcons = {
  editar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
    </svg>
  ),
  senha: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  ),
  holerites: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
    </svg>
  ),
  ponto: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  'bater-ponto': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 11 12 14 22 4"></path>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
    </svg>
  )
}

export default function PerfilAcoes({ onMessage }) {
  const navigate = useNavigate()

  const handleAction = acao => {
    if (acao.path) {
      navigate(acao.path)
      return
    }

    onMessage(`${acao.label} sera integrado ao backend em uma proxima etapa.`)
  }

  return (
    <Card variant="elevated" className="perfil-acoes-card">
      <div className="perfil-card-header">
        <div>
          <h2>Acoes Rapidas</h2>
          <p>Acesse os recursos mais usados no portal do colaborador.</p>
        </div>
      </div>

      <div className="perfil-acoes-grid">
        {perfilAcoes.map(acao => (
          <Button
            key={acao.id}
            variant={acao.variant}
            size="md"
            fullWidth
            icon={actionIcons[acao.id]}
            onClick={() => handleAction(acao)}
          >
            {acao.label}
          </Button>
        ))}
      </div>
    </Card>
  )
}
