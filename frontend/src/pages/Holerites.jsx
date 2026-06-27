import React from 'react'
import Main from '../components/template/Main'
import InfoTable from '../components/ui/InfoTable'
import './Holerites.css'

const holerites = [
  {
    competencia: 'Maio/2026',
    emissao: '05/06/2026',
    valor: 'R$ 3.250,00',
    status: 'Disponível'
  },
  {
    competencia: 'Abril/2026',
    emissao: '05/05/2026',
    valor: 'R$ 3.180,00',
    status: 'Disponível'
  },
  {
    competencia: 'Março/2026',
    emissao: '05/04/2026',
    valor: 'R$ 3.130,00',
    status: 'Disponível'
  }
]

export default function Holerites() {
  const headers = ['Competência', 'Emissão', 'Valor Líquido', 'Status', 'Ações']

  const rows = holerites.map((holerite, index) => [
    holerite.competencia,
    holerite.emissao,
    holerite.valor,
    <span
      key={`status-${index}`}
      className={`status-pill ${holerite.status === 'Disponível' ? 'available' : 'pending'}`}>
      {holerite.status}
    </span>,
    <div className="holerites-actions" key={`actions-${index}`}>
      <button type="button" onClick={() => window.alert(`Visualizar ${holerite.competencia}`)}>
        Visualizar
      </button>
      <button type="button" onClick={() => window.alert(`Baixando PDF de ${holerite.competencia}`)}>
        Download PDF
      </button>
    </div>
  ])

  return (
    <Main
      icon="file-invoice-dollar"
      title="Holerites"
      subtitle="Consulte seus holerites e faça downloads em PDF."
    >
      <section className="holerites-page">
        <div className="holerites-intro">
          <h2>Holerites</h2>
          <p>Consulte os últimos contracheques e faça o download dos documentos sempre que precisar.</p>
        </div>

        <InfoTable headers={headers} rows={rows} />
      </section>
    </Main>
  )
}
