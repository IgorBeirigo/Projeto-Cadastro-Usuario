import React, { useState } from 'react'
import Alert from '../components/ui/Alert'
import PerfilHeader from '../components/perfil/PerfilHeader'
import PerfilInfoCard from '../components/perfil/PerfilInfoCard'
import PerfilResumo from '../components/perfil/PerfilResumo'
import PerfilAcoes from '../components/perfil/PerfilAcoes'
import { colaboradorPerfil } from '../components/perfil/perfilMock'
import './MeuPerfil.css'

export default function MeuPerfil() {
  const [alert, setAlert] = useState(null)

  const showMessage = message => {
    setAlert({ message, type: 'info' })
    setTimeout(() => setAlert(null), 4500)
  }

  return (
    <div className="meu-perfil-page">
      {alert && (
        <Alert variant={alert.type} dismissible onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      <PerfilHeader
        colaborador={colaboradorPerfil}
        onEdit={() => showMessage('Edicao de perfil sera conectada ao backend em breve.')}
      />

      <PerfilResumo colaborador={colaboradorPerfil} />

      <div className="perfil-content-grid">
        <PerfilInfoCard colaborador={colaboradorPerfil} />
        <PerfilAcoes onMessage={showMessage} />
      </div>
    </div>
  )
}
