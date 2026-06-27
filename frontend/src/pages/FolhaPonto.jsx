import React, { useMemo, useState } from 'react'
import Main from '../components/template/Main'
import InfoTable from '../components/ui/InfoTable'
import './FolhaPonto.css'

const registros = [
  {
    data: '20/06/2026',
    entrada: '08:00',
    saidaAlmoco: '12:00',
    retornoAlmoco: '13:00',
    saida: '17:00',
    horas: '8h',
    status: 'Completo'
  },
  {
    data: '21/06/2026',
    entrada: '08:12',
    saidaAlmoco: '12:02',
    retornoAlmoco: '13:01',
    saida: '17:05',
    horas: '7h53',
    status: 'Completo'
  },
  {
    data: '22/06/2026',
    entrada: '08:00',
    saidaAlmoco: '12:00',
    retornoAlmoco: '13:00',
    saida: '16:45',
    horas: '7h45',
    status: 'Completo'
  }
]

const months = [
  { value: '06', label: 'Junho' },
  { value: '05', label: 'Maio' },
  { value: '04', label: 'Abril' }
]

const years = ['2026', '2025']

export default function FolhaPonto() {
  const [selectedMonth, setSelectedMonth] = useState('06')
  const [selectedYear, setSelectedYear] = useState('2026')

  const filteredRecords = useMemo(() => {
    return registros.filter(record => record.data.endsWith(`/${selectedYear}`))
  }, [selectedYear])

  const headers = ['Data', 'Entrada', 'Saída almoço', 'Retorno almoço', 'Saída', 'Horas trabalhadas', 'Status']
  const rows = filteredRecords.map((registro, index) => [
    registro.data,
    registro.entrada,
    registro.saidaAlmoco,
    registro.retornoAlmoco,
    registro.saida,
    registro.horas,
    <span
      key={`status-${index}`}
      className={`status-pill ${registro.status === 'Completo' ? 'available' : 'pending'}`}>
      {registro.status}
    </span>
  ])

  return (
    <Main
      icon="clock"
      title="Folha de Ponto"
      subtitle="Consulte seus registros de jornada e acompanhe suas horas."
    >
      <section className="folha-page">
        <div className="folha-header">
          <div>
            <h2>Folha de Ponto</h2>
            <p>Confira os registros de horário por dia e filtre por mês e ano.</p>
          </div>
          <div className="folha-filters">
            <label>
              Mês
              <select
                value={selectedMonth}
                onChange={event => setSelectedMonth(event.target.value)}>
                {months.map(month => (
                  <option key={month.value} value={month.value}>{month.label}</option>
                ))}
              </select>
            </label>
            <label>
              Ano
              <select value={selectedYear} onChange={event => setSelectedYear(event.target.value)}>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <InfoTable headers={headers} rows={rows} />
      </section>
    </Main>
  )
}
