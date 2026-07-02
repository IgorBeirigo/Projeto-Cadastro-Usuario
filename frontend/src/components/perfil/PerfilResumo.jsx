import React from 'react'
import Card from '../ui/Card'
import Badge from '../ui/Badge'

const resumoIcones = {
  tempo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  cargo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
  ),
  status: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6 9 17l-5-5"></path>
    </svg>
  ),
  acesso: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
      <polyline points="10 17 15 12 10 7"></polyline>
      <line x1="15" y1="12" x2="3" y2="12"></line>
    </svg>
  )
}

export default function PerfilResumo({ colaborador }) {
  const indicadores = [
    { id: 'tempo', label: 'Tempo de empresa', value: colaborador.tempoEmpresa, detail: 'Desde a admissao' },
    { id: 'cargo', label: 'Cargo', value: colaborador.cargo, detail: colaborador.departamento },
    { id: 'status', label: 'Status', value: colaborador.status, detail: 'Cadastro validado' },
    { id: 'acesso', label: 'Ultimo acesso', value: colaborador.ultimoAcesso, detail: 'Portal do colaborador' }
  ]

  return (
    <section className="perfil-resumo">
      {indicadores.map(item => (
        <Card key={item.id} variant="default" hoverable className="perfil-resumo-card">
          <div className={`perfil-resumo-icon perfil-resumo-icon-${item.id}`}>
            {resumoIcones[item.id]}
          </div>
          <span>{item.label}</span>
          {item.id === 'status' ? (
            <Badge variant={item.value === 'Ativo' ? 'success' : 'error'} rounded>
              {item.value}
            </Badge>
          ) : (
            <strong>{item.value}</strong>
          )}
          <p>{item.detail}</p>
        </Card>
      ))}
    </section>
  )
}
